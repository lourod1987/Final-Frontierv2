/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    const modal = document.querySelector('.modal');
    const retry = document.querySelector('.modal-button');

    canvas.width = 800;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render(dt);

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        if (game.run === true) {
            win.requestAnimationFrame(main);
        }
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        // if (game.gameState === 1) {
        //     main();
        // }
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        // let j = false;
        // if (time.timer[1] === 10 && j === false) {
        //     let stepX = 0;
        //     j = true;
        //     for(let i = 6; i < 11; i++) {
        //         createEnemyShips(`enemy${i}`, stepX,  0);
        //         stepX += 80;
        //     }
        // }

        if (explosionArr > 0) {
            setTimeout( () => {delExplosion(`explosion${e}`);}, 2000);
        }

        let r = 0;
        if (explosionArr.length > 0) {
            explosionArr[r].render();
            r++;
        }
        

        if (player.health <= 0) {
            gameOver();
        }

        time.update(dt);
        updateEntities(dt);
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

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allEnemies.forEach(function(enemy) {
            enemy.bounds();
        });
        bulletArr.forEach(function(bullet) {
            bullet.update();
        });

        player.update(dt);
        
        
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render(dt) {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.*/
        //     numRows = 6,
        //     numCols = 5,
        //     row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"*/
         
       /* for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.*/
                
        //         ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
 
        renderEntities(dt);
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities(dt) {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        bg.render();
        bg1.render();
        uiBG.render();
        ui.render();
        uiText.render();
        time.render();
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
        // win.cancelAnimationFrame(run);
        // document.appendChild('');
        modal.classList.toggle('modal');
        game.run = false;
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
        function gameTitle() {
            // renderTitle();
            game.render();
            textTitle.render();

            if (game.gameState === 1) {
                main();
            }
            
            if (game.gameState === 0) {
                win.requestAnimationFrame(gameTitle);
            }
            
            // title.run = false;
            // win.cancelAnimationFrame(gameTitle);
        }

        // function renderTitle() {
            
        // }
        
        gameTitle();
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/blue_space_scape_by_heatstroke99-d331bty.png',
        'images/tileable-nebula.png',
        'images/Rock.png',
        'images/Heart.png',
        'images/particleBlue.png',
        'images/Key.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);