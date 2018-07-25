/*
            Redone Engine Build Code (for readability and architecture) 
=====================================================================================
*/
var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    const modal = document.querySelector('.modal'),
          retry = document.getElementById('play-again'),
          close = document.getElementById('close');

    const level1MusicLoop = document.getElementById("level1MusicLoop"),
          gameWinMusic = document.getElementById("gameWinMusicLoop"),
          startMusicLoop = document.getElementById("startMusicLoop");

    canvas.width = 800;
    canvas.height = 600;
    doc.body.appendChild(canvas);

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
        
        // win.requestAnimationFrame(gameController);
    }

    function reset() {
        time.timer = [0, 0];
        z = 0;
        score.score = 0;
        player.health = 3;
        allEnemies = [];
        bulletArr = [];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        scroll.y = 0;
        scroll.y1 = -600;

        // if (allEnemies.length > 0) {
        //     for (let j = 0; j <= allEnemies.length; j++) {
        //         // allEnemies.splice(j, 1);
        //         delete allEnemies[j];
        //         allEnemies.pop();
        //     }
        // }
        // if (bulletArr.length > 0) {
        //     for (let k = 0; k <= bulletArr.length; k++) {
        //         // bulletArr.splice(k, 1);
        //         delete bulletArr[k];
        //         bulletArr.pop();
        //     }
        // }
        game.run = true;
        // gameController();
    }

    let startScreenMusic = 0;
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
        
        if (startScreenMusic === 0) {
            startMusicLoop.volume = 0.3;
            startMusicLoop.play();
            startMusicLoop.loop = true;
            startScreenMusic++;
        }

        if (game.gameState === 1) {
            startMusicLoop.pause();
            startMusicLoop.currentTime = 0;
            i = 0;
            gameController();
        }
    }

    let k = 0;
    function level1() {
        if (time.timer[0] === 1 && time.timer[1] > 29 && player.health > 0) {
            game.gameState = 2;
            gameController();
        }

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        level1EnemySpawn();
        level1Update(dt);
        level1Render(dt);

        if (k === 0) {
            level1MusicLoop.volume = 0.05;
            level1MusicLoop.play();
            level1MusicLoop.loop = true;
            k++;
        }
        

        lastTime = now;
        if (game.gameState === 1 && game.run === true) {
            win.requestAnimationFrame(level1);
        }
    }

    let m = 0;
    function gameWin() {
        winUpdate();
        renderWin();
        level1MusicLoop.pause();
        level1MusicLoop.currentTime = 0;
        k = 0;

        if (m === 0) {
            gameWinMusic.volume = 0.05;
            gameWinMusic.play();
            gameWinMusic.loop = true;
            m++;
        }

        if (game.gameState === 0) {
            gameWinMusic.pause();
            gameWinMusic.currentTime = 0;
            m = 0;
            reset();
            gameController();
        }

        if (game.gameState === 1) {
            gameWinMusic.pause();
            gameWinMusic.currentTime = 0;
            m = 0;
            gameController();
        }
        
        if (game.gameState === 2) {
            win.requestAnimationFrame(gameWin);
        }

        function winUpdate() {
            // winText.update();
        }

        function renderWin() {
            won.render();
            winUI.render();
            winText.render();
            winNewGameText.render();
            winReturnText.render();
        }

        
        // if (i === 0) {
        //     startMusicLoop.volume = 0.3;
        //     startMusicLoop.play();
        //     startMusicLoop.loop = true;
        //     i++;
        // }
    }

    function gameOver() {
        game.run = false;
        game.gameState = 5;
        modal.classList.toggle('modal');
        // modal.style.display = "visible";

        function input() {
            title.handleInput();
        }

        function update() {
            switch (game.gameState) {
                case 0:
                    modal.style.display = "none";
                    reset();
                    gameController();
                    break;
                case 1:
                    modal.style.display = "none";
                    // modal.classList.toggle('modal');
                    reset();
                    gameController();
                    break;
                case 5:
                    input();
                    break;
            }
        }
        
        retry.addEventListener("click", () => {
            level1MusicLoop.pause();
            level1MusicLoop.currentTime = 0;
            k = 0;
            game.gameState = 1;
            update();
        });

        close.addEventListener("click", () => {
            level1MusicLoop.pause();
            level1MusicLoop.currentTime = 0;
            k = 0;
            game.gameState = 0;
            update();
        });
    }

    let z = 0;
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

    function level1Update(dt) {
        if (player.health <= 0) {
            gameOver();
        }

        if (explosionArr > 0) {
            setTimeout( () => {delExplosion(`explosion${e}`);}, 2000);
        }

        let r = 0;
        if (explosionArr.length > 0) {
            explosionArr[r].render();
            r++;
        }
        
        time.update(dt);
        level1UpdateEntities(dt);
        player.bounds();
        bullet.bounds();
        checkCollision();
        scroll.scroll(dt);
        player.update(dt);
        
        if (bulletArr.length > 0) {
            bulletChecks();
        }
    }

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

        player.update(dt); //?
        player.handleInput(); //?
    }

    function level1Render(dt) {
        // Before drawing, clear existing canvas
        // ctx.clearRect(0,0,canvas.width,canvas.height); //?
        scroll.render();
        uiBG.render();
        ui.render();
        score.render();
        time.render();
        healthText.render();
        health.render();
        level1RenderEntities(dt);
    }

    function level1RenderEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        bulletArr.forEach(function(bullet) {
            bullet.render();
        });

        let r = 0;
        if (explosionArr.length > 0) {
            explosionArr[r].render();
            r++;
        }
    
        player.render(dt);
    }

    Resources.load([
        'images/blue_space_scape_by_heatstroke99-d331bty.png',
        'images/splashScreen_v1.png',
        'images/tileable-nebula.png',
        // 'images/Rock.png',
        'images/Health.png',
        'images/particleBlue.png',
        'images/explosion.png',
        'images/laser.png',
        'images/enemyShip.png',
        'images/playerShip_v3.png'
    ]);
    Resources.onReady(gameController);

    global.ctx = ctx;
})(this);