/*
            Redone Engine Build Code (for readability and architecture) 
=====================================================================================
*/
'use strict';
var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    const level1MusicLoop = document.getElementById('level1MusicLoop'),
          gameWinMusicLoop = document.getElementById('gameWinMusicLoop'),
          startMusicLoop = document.getElementById('startMusicLoop');

    canvas.width = 800;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    //This function uses a switch to control which part of the game is running 
    function gameController() {
        lastTime = Date.now();
        switch (game.gameState) {
            case 0:
                ctx.clearRect(0,0,canvas.width,canvas.height);
                startScreen();
                break;
            case 1:
                ctx.clearRect(0,0,canvas.width,canvas.height);
                level1();
                break;
            case 2:
                ctx.clearRect(0,0,canvas.width,canvas.height);
                gameWin();
        }
    }

    //Resets all gameplay related values to original state.
    function reset() {
        time.timer = [0, 0];
        z = 0;
        w = 0;
        score.score = 0;
        player.health = 3;
        player.x = 200;
        player.y = 380;
        allEnemies = [];
        bulletArr = [];
        enemyBullets = [];
        upgradesArr = [];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        scroll.y = 0;
        scroll.y1 = -600;
        game.run = true;
    }

    //startScreen is the game loop for the first screen a user views
    let startScreenMusic = false; //used to ensure music loop only plays once
    function startScreen() {
        renderTitle();
        
        if (game.gameState === 0) {
            win.requestAnimationFrame(startScreen);
        }

        function renderTitle() {
            title.render();
            splashImg.render();
            textTitle.render();
        }
        
        if (startScreenMusic === false) {
            startMusicLoop.volume = 0.3;
            startMusicLoop.play();
            startMusicLoop.loop = true;
            startScreenMusic = true;
        }

        if (game.gameState === 1) {
            startMusicLoop.pause();
            startMusicLoop.currentTime = 0;
            startScreenMusic = false;
            // debugger;
            gameController();
        }
    }

    //level1 is the game loop for the game
    let level1Music = false;  //used to ensure music loop only plays once
    function level1() {
        if (time.timer[0] === 1 && time.timer[1] > 34 && player.health > 0) {
            game.gameState = 2;
            gameController();
        }

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        level1EnemySpawn();
        enemyShoots();
        level1Update(dt);
        level1Render(dt);

        if (level1Music === false) {
            level1MusicLoop.volume = 0.1;
            level1MusicLoop.play();
            level1MusicLoop.loop = true;
            level1Music = true;
        }
        

        lastTime = now;
        if (game.gameState === 1 && game.run === true) {
            win.requestAnimationFrame(level1);
        }
    }

    //gameWin is the game loop for the game win state
    let gameWinMusic = false; //used to ensure music loop only plays once
    function gameWin() {
        renderWin();
        level1MusicLoop.pause();
        level1MusicLoop.currentTime = 0;
        level1Music = false;

        if (gameWinMusic === false) {
            gameWinMusicLoop.volume = 0.05;
            gameWinMusicLoop.play();
            gameWinMusicLoop.loop = true;
            gameWinMusic = true;
        }

        if (game.gameState === 0) {
            gameWinMusicLoop.pause();
            gameWinMusicLoop.currentTime = 0;
            gameWinMusic = false;
            reset();
            gameController();
        }

        if (game.gameState === 1) {
            gameWinMusicLoop.pause();
            gameWinMusicLoop.currentTime = 0;
            gameWinMusic = false;
            reset();
            gameController();
        }
        
        if (game.gameState === 2) {
            win.requestAnimationFrame(gameWin);
        }

        function renderWin() {
            won.render();
            winUI.render();
            winText.render();
            winNewGameText.render();
            winReturnText.render();
        }
    }

    //game over loop
    function gameOver() {
        renderLoss();
        update();

        function renderLoss() {
            gameOverUI.render();
            gameOverText.render();
            gameOverText1.render();
            loseNewGameText.render();
            loseReturnText.render();
        }

        function update() {
            switch (game.gameState) {
                case 0:
                    level1MusicLoop.pause();
                    level1MusicLoop.currentTime = 0;
                    level1Music = false;
                    game.gameState = 0;
                    reset();
                    gameController();
                    break;
                case 1:
                    level1MusicLoop.pause();
                    level1MusicLoop.currentTime = 1;
                    level1Music = false;
                    game.gameState = 1;
                    reset();
                    gameController();
                    break;
                case 5:
                    win.requestAnimationFrame(gameOver);
                    break;
            }
        }
    }

    let z = 0; //locks spawning so that it only occurs a single time
    //level1EnemySpawn creates enemy units at a designated time
    function level1EnemySpawn() {
        if (time.timer[1] === 5 && z < 1) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[1] === 20 && z < 2) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[1] === 30 && z < 3) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[1] === 40 && z < 4) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[1] === 50 && z < 5) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[0] === 1 && time.timer[1] === 0 && z < 6) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[0] === 1 && time.timer[1] === 10 && z < 7) {
            enemy0.spawn();
            z++;
        }

        if (time.timer[0] === 1 && time.timer[1] === 20 && z < 8) {
            enemy0.spawn();
            z++;
        }
    }

    let w = 0; //locks enemy firing so that it only occurs a single time
    //enemyShoots allows specific units to fire a single time at the set intervals
    function enemyShoots() {
        if (time.timer[1] === 35 && w < 1) {
            enemyFire();
            w++;
        }
        if (time.timer[1] === 40 && w < 2) {
            enemyFire();
            w++;
        }
        if (time.timer[1] === 45 && w < 3) {
            enemyFire();
            w++;
        }
        if (time.timer[1] === 50 && w < 4) {
            enemyFire();
            w++;
        }
        if (time.timer[1] === 55 && w < 5) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 0 && w < 6) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 5 && w < 7) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 10 && w < 8) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 15 && w < 9) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 20 && w < 10) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 25 && w < 11) {
            enemyFire();
            w++;
        }
        if (time.timer[0] === 1 && time.timer[1] === 30 && w < 12) {
            enemyFire();
            w++;
        }
    }

    //updates the state of all objects in level1
    function level1Update(dt) {
        if (player.health <= 0) {
            game.gameState = 5;
            game.run = false;
            gameOver();
        }

        if (explosionArr.length > 0) {
            setTimeout( () => {delExplosion();}, 200);
        }

        explosionArr.forEach(function(explosion) {
            explosion.render();
        });
        
        time.update(dt);
        level1UpdateEntities(dt);
        player.bounds();
        bullet.bounds();
        checkCollision();
        enemyBulletChecks();
        scroll.scroll(dt);
        
        
        if (bulletArr.length > 0) {
            setTimeout( () => {bulletChecks();}, 50);
        }
    }

    //called from level1update this updates entities in the game
    function level1UpdateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allEnemies.forEach(function(enemy) {
            enemy.bounds();
        });
        bulletArr.forEach(function(bullet) {
            bullet.update();
        });

        enemyBullets.forEach(function(bullet) {
            bullet.update();
        });

        player.handleInput(); //?
    }

    //renders all objects in level1
    function level1Render(dt) {
        scroll.render(dt);
        uiBG.render();
        ui.render();
        score.render();
        time.render();
        healthText.render();
        health.render();
        level1RenderEntities(dt);
    }

    //called from level1Render this updates the render all entities in the game
    function level1RenderEntities() {
        enemyBullets.forEach(function(bullet) {
            bullet.render();
        });

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        bulletArr.forEach(function(bullet) {
            bullet.render();
        });

        if (explosionArr.length > 0) {
            explosionArr.forEach(function(explosion) {
                explosion.render();
            });
        }
        if(player.health > 0) {
            player.render();
        }
    }

    //loads required resources
    Resources.load([
        'images/blue_space_scape_by_heatstroke99-d331bty.png',
        'images/splashScreen_v1.png',
        'images/tileable-nebula.png',
        'images/asteroid.png',
        'images/Health.png',
        'images/explosion_v1.png',
        'images/laser.png',
        'images/enemyLaser.png',
        'images/enemyShip_v1.png',
        'images/enemyShip_v2.png',
        'images/playerShip_v3.png'
    ]);
    Resources.onReady(gameController); //once required resources are loaded the gameController function is called

    global.ctx = ctx;
})(this);