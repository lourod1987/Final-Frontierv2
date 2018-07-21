//Ball
// colorCircle(ballX, ballY, 10, '#fff');
        
// //Left Paddle
// colorRect(10, paddeLeftY, paddleThickness, paddleH, '#fff');

// //Right Paddle
// colorRect(canvas.width - 25, paddeRightY, paddleThickness, paddleH, '#fff');

//score
// canvasContext.fillText(playerScore, 100, 50);
// canvasContext.fillText(compScore, canvas.width - 100, 50);

// ctx.font="30px Verdana";
// // Create gradient
// var gradient=ctx.createLinearGradient(0,0,c.width,0);
// gradient.addColorStop("0","magenta");
// gradient.addColorStop("0.5","blue");
// gradient.addColorStop("1.0","red");
// // Fill with gradient
// ctx.fillStyle=gradient;
// ctx.fillText("Big smile!",10,90); 

// function colorCircle(centerX, centerY, radius, drawColor) {
//     canvasContext.fillStyle = drawColor;
//     canvasContext.beginPath();
//     canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
//     canvasContext.fill();
// }

// function colorRect(leftX, topY, width, height, drawColor) {
//     canvasContext.fillStyle = drawColor;
//     canvasContext.fillRect(leftX, topY, width, height);
// }

/*
                        Cleaner Engine Build Code (for readability and architecture) 
=====================================================================================
*/

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    const modal = document.querySelector('.modal');
    const retry = document.querySelector('.modal-button');
    const startMusic = document.getElementById("startMusicLoop");

    canvas.width = 800;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    function init() {
        lastTime = Date.now();
        gameController();
    }

    function gameController() {
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

    function reset() {
        time.timer = [0, 0];
        score.score = 0;
    }

    let i = 0;
    function startScreen() {
        renderTitle();

        if (game.gameState === 1) {
            startMusicLoop.pause();
            startMusicLoop.currentTime = 0;
            gameController();
        }
        
        if (game.gameState === 0) {
            win.requestAnimationFrame(startScreen);
        }

        function renderTitle() {
            game.render();
            textTitle.render();
        }

        
        if (i === 0) {
            startMusicLoop.volume = 0.3;
            startMusicLoop.play();
            startMusicLoop.loop = true;
            i++;
        }
    }

    function level1() {
        if (time.timer[0] === 1 && time.timer[1] > 30 && player.health > 0) {
            game.gameState = 2;
            gameController();
        }

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        level1EnemySpawn();
        level1Update(dt);
        level1Render(dt);
        

        lastTime = now;
        if (game.gameState === 1 && game.run === true) {
            win.requestAnimationFrame(level1);
        }
    }

    function gameWin() {
        winUpdate();
        renderWin();

        if (game.gameState === 0) {
            // startMusicLoop.pause();
            // startMusicLoop.currentTime = 0;
            gameController();
        }

        if (game.gameState === 1) {
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
            winText.render();
        }

        
        // if (i === 0) {
        //     startMusicLoop.volume = 0.3;
        //     startMusicLoop.play();
        //     startMusicLoop.loop = true;
        //     i++;
        // }
    }

    let z = 0;
    function level1EnemySpawn() {
        if (time.timer[1] === 10 && z < 1) {
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
        bg.scroll(dt);
        bg1.scroll(dt);
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
        bg.render();
        bg1.render();
        uiBG.render();
        ui.render();
        score.render();
        time.render();
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


    function gameOver() {
        game.run = false;
        modal.classList.toggle('modal');
    }

    Resources.load([
        'images/blue_space_scape_by_heatstroke99-d331bty.png',
        'images/tileable-nebula.png',
        'images/Rock.png',
        'images/Heart.png',
        'images/particleBlue.png',
        'images/explosion.png',
        'images/Key.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);