//This class is specifically for managing the games state, paused, running title screen, level 1 etc.
class Game {
    constructor() {
        this.run = true;
        this.gameState = 0;
    }
}

/*
UI creation components
=======================
*/
class TitleScreen {
    constructor() {
        this.titleBG = 'images/blue_space_scape_by_heatstroke99-d331bty.png';
        this.run = true;
        this.gameState = 0;
        this.x = 0;
        this.y = 0;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.titleBG), this.x, this.y);
    }
        
    handleInput(key) {
        switch(key) {
            case 'enter':
                game.gameState = 1;
                break;
            case 'esc':
                game.gameState = 0;
                break;
        }
    }
}

//places any image at designated x and y coordinates
class BG {
    constructor(bg, x, y) {
        this.bg = bg;
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.bg), this.x, this.y);
    }
}

//ScrollBG class creates screen scroll by placing and updating y coordinates of two tiled images
class ScrollBG extends BG {
    constructor(bg, x, y, x1, y1) {
        super(bg, x, y);
        this.x1 = x1;
        this.y1 = y1;
    }

    scroll(dt) {
        this.y += 12 * dt;
        this.y1 += 12 * dt;

        if (this.y > 600) {
            this.y = -599;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.bg), this.x, this.y);
        ctx.drawImage(Resources.get(this.bg), this.x1, this.y1);
    }
}

//Health class places an image 3 times initially reduces based on curent player health
class Health extends BG {
    constructor(bg, x, y) {
        super(bg, x, y);
    }

    render() {
        if (player.health > 0) {
            ctx.drawImage(Resources.get(this.bg), this.x, this.y);
        }
        if (player.health > 1) {
            ctx.drawImage(Resources.get(this.bg), this.x + 12, this.y);
        }
        if (player.health > 2) {
            ctx.drawImage(Resources.get(this.bg), this.x + 24, this.y);
        }
        if (player.health > 3) {
            ctx.drawImage(Resources.get(this.bg), this.x + 36, this.y);
        }
    }
}

//creates a square at the designated xy coordinates with a paticular width, height, and color
class SquareUI {
    constructor(x, y, width, height, colorFill) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colorFill = colorFill;
    }

    render() {
        ctx.fillStyle = this.colorFill;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//Places text with font choice at designated xy coordinates
class Text {
    constructor(font, text, x, y) {
        this.text = text;
        this.font = font;
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = 'white';
        ctx.fillText(this.text, this.x, this.y);
    }
}

//modifies Text class by creating text that flashes
class FlashingText extends Text {
    constructor(font, text, x, y) {
        super(font, text, x, y);
        this.flash = 0;
    }

    render() {
        ctx.globalAlpha = 1.0;
        if (this.flash < 40) {
            ctx.globalAlpha = 0;
            this.flash++;
        } else {
            ctx.globalAlpha = 1;
    
            if (this.flash  > 80) {
                this.flash = 0; 
            }
            this.flash++;   
        }

        ctx.font= this.font;
        ctx.fillStyle = 'white';
        ctx.fillText(this.text, this.x, this.y);
    }
}

//Outputs current player score based on enemy units destroyed
class ScoreText extends Text {
    constructor(font, text, x, y) {
        super(font, text, x, y);
        this.score = 0;
        
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = 'white';
        
        ctx.fillText(this.text + this.score, this.x, this.y);
    }
}

//Displays win screen text
class WinText extends Text {
    constructor(font, text, text1, x, y, x1, y1) {
        super(font, text, x, y);
        this.text1 = text1;
        this.x1 = x1;
        this.y1 = y1;
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = 'white';
        ctx.fillText(this.text, this.x, this.y);
        ctx.fillText(this.text1 + score.score,  this.x1, this.y1);
    }
}

//This class displays and updates the in game timer
class TimeText extends Text {
    constructor(font, text, x, y) {
        super(font, text, x, y);
        this.timer = [0, 0];
        this.timeRunning = false;
        this.i = 0;
    }

    update(dt) {
        if (this.i >= 60) {
            this.timer[1]++;

            if (this.timer[1] > 59) {
                this.timer[1] = 0;
                this.timer[0]++;
            }
            this.i = 0;
        }
        this.i++;
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = 'white';
        ctx.fillText(this.text + leadingZero(this.timer[0]) + ':' + leadingZero(this.timer[1]), this.x, this.y);
    }
}

/*
Game entities
================
*/
//Creates, moves, and controlls most of the spawning logic for game enemies
class Enemy {
    constructor(sprite, x, y, width, height, shoots) {
        this.sprite = sprite;
        this.enemyShip1 = 'images/enemyShip_v1.png';
        this.enemyShip2 = 'images/enemyShip_v2.png';
        this.asteroid = 'images/asteroid.png';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = Math.floor(Math.random() * 49) + 21;
        this.minBoundsX = 0;
        this.maxBoundsX = 725;
        this.i = 0;
        this.s = 0;
        this.moveX = 0;
        this.shoots = shoots;
        // this.minBoundsY = 0;
        // this.maxBoundsY = 520;
        // ctx.rotate(angleRadians) // for rotating asteroids
        // radians = degrees * (Math.PI/180) //conversion to radians formula
        // scale(x,y) multiplies the x and y values by a given factor
        // It’s important to note that whatever transformations apply for all subsequent objects until you reverse them.
        /*
        example of how to use save() and restore() methods to reset ctx rendering state. These states can be stored:
        The current transformation matrix (rotation, scaling, translation)
        strokeStyle
        fillStyle
        font
        globalAlpha
        lineWidth
        lineCap
        lineJoin
        miterLimit
        shadowOffsetX
        shadowOffsetY
        shadowBlur
        shadowColor
        globalCompositeOperation
        textAlign
        textBaseline
        The current clipping region

        var c = document.querySelector("#c");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "blue";
        ctx.fillRect(0,0,50,50);

        // Save state with blue fill
        ctx.save();
        ctx.fillStyle = "green";
        ctx.fillRect(100,100,10,10);
        // Restore to blue fill
        ctx.restore();

        ctx.fillRect(200,10,20,20);
        */
    }

    update(dt) {
        this.y += this.speed * dt;

        if (this.y > 600) {
            this.y = -20;
        }
        
        if (this.sprite !== this.asteroid) {
            if (this.i < 80) {
                this.x++;
                this.i++;
            } else {
                this.x--;
                if (this.i  > 160) {
                    this.i = 0; 
                }
                this.i++;
            }
        }
    }

    spawn() {
        if (time.timer[1] === 5) {
            let stepX = 0;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip1, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 20) {
            let stepX = 0;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip1, stepX,  0);
                stepX += 150;
                this.s++;
            }
            stepX = 0;
            for(let i = 0; i < 4; i++) {
                createEnemyShips(`enemies${this.s}`, this.asteroid, stepX,  0);
                stepX += 250;
                this.s++;
            }
        }

        if (time.timer[1] === 30) {
            let stepX = 0;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`,this.enemyShip2, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 40) {
            let stepX = 0;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip2, stepX,  0);
                stepX += 150;
                this.s++;
            }
            stepX = 0;
            for(let i = 0; i < 4; i++) {
                createEnemyShips(`enemies${this.s}`, this.asteroid, stepX,  0);
                stepX += 250;
                this.s++;
            }
        }

        if (time.timer[1] === 50) {
            let stepX = 0;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip1, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 0) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip1, stepX,  stepY);
                stepX += 200;
                stepY += 20;
                this.s++;
            }
            stepX = 0;
            for(let i = 0; i < 4; i++) {
                createEnemyShips(`enemies${this.s}`, this.asteroid, stepX,  0);
                stepX += 250;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 10) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip2, stepX,  stepY);
                stepX += 200;
                stepY += 20;
                this.s++;
            }
            stepX = 0;
            stepY = -80;
            for(let i = 0; i < 3; i++) {
                createEnemyShips(`enemies${this.s}`,this.enemyShip1, stepX,  stepY);
                stepX += 300;
                stepY += 80;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 20) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 0; i < 6; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip2, stepX,  stepY);
                stepX += 200;
                stepY += 40;
                this.s++;
            }
            stepX = 0;
            stepY = -80;
            for(let i = 0; i < 3; i++) {
                createEnemyShips(`enemies${this.s}`, this.enemyShip2, stepX,  stepY);
                stepX += 300;
                stepY += 20;
                this.s++;
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    bounds() { 
        if (this.x >= this.maxBoundsX) {
            this.x = 725;
        } else if (this.x <= this.minBoundsX) {
            this.x = 0;
        }
        
        // if (this.y >= this.maxBoundsY) {
        //     this.y = 520;
        // }
    }
}

class Upgrades extends Enemy {
    constructor(sprite, x, y, width, height) {
        super(sprite, x, y, width, height);
        this.healthDrop = 'GemGreen.png';
        this.shield = 'GemBlue.png';
        this.triShot = 'GemOrange.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Creates, moves, and gives audio to bullet objects
class Bullet {
    constructor(x, y) {
        this.bullet = 'images/laser.png';
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 30;
        this.minBoundsX = 0;
        this.maxBoundsX = 725;
        this.minBoundsY = 0;
        this.maxBoundsY = 525;
    }

    update() {
        this.y -= 5;
    }

    render() {
        ctx.drawImage(Resources.get(this.bullet), this.x, this.y);
    }

    bounds() { 
        if (this.x >= this.maxBoundsX) {
            this.bullet = null;
        } else if (this.x <= this.minBoundsX) {
            this.bullet = null;
        } 
        
        if (this.y <= this.minBoundsY) {
            this.bullet = null;
        }
    }
}

//Creates, moves, and gives audio to bullet objects
class EnemyBullet extends Bullet {
    constructor(x, y, minBoundsX, maxBoundsX, minBoundsY, maxBoundsY) {
        super(x, y, minBoundsX, maxBoundsX, minBoundsY, maxBoundsY);
        this.bullet = 'images/enemyLaser.png';
        this.width = 20;
        this.height = 30;
        this.shotSound = document.getElementById('enemyShotSound');
    }

    update() {
        this.y += 5;
    }

    render() {
        ctx.drawImage(Resources.get(this.bullet), this.x, this.y);
    }

    bounds() { 
        if (this.x >= this.maxBoundsX) {
            this.bullet = null;
        } else if (this.x <= this.minBoundsX) {
            this.bullet = null;
        } 
        
        if (this.y <= this.minBoundsY) {
            this.bullet = null;
        } else if (this.y >= this.maxBoundsY) {
            this.bullet = null;
        }
    }
}

//Creates, places initially, enables user control, sets health, and bounds of player avatar
class Player {
    constructor(x, y) {
        this.sprite = 'images/playerShip_v3.png';
        this.particle = 'images/particleBlue.png';
        this.x = x;
        this.y = y;
        // this.fireRate = 0;
        this.width = 50;
        this.height = 40;
        this.minBoundsX = 5;
        this.maxBoundsX = 725;
        this.minBoundsY = 0;
        this.maxBoundsY = 545;
        this.health = 3;
        this.shield = 0;
        this.b = 0;
        // this.moveSound = document.getElementById('moveSound');
        this.damage = document.getElementById('playerHit');
        this.shot = document.getElementById('playerShot');
        this.bulletSound = document.getElementById('bulletSound');
    }

    update(dt) {
    }
    
    render(dt) {
        /*
        Using createImageData, getImageData, and putImageData will allow me to add filter effects to canvas. 
        Could be used to flash canvas on player loss of health
        var data = ctx.getImageData(0, 0, 800, 600);

        function paintGreen (imageData) {
            var numPixels = imageData.data.length / 4       //there are 4 compenents for each pixel

            for (let i = 0; i < numPixels; i++) {
                imageData.data(i * 4 + 1) = 255;
                imageData.data(i * 4 + 3) = 255;
            }
            ctx.putImageData(imageData, 0, 0);
        }
        paintGreen(data);
        */

        ctx.globalAlpha = 1.0;
        if (this.health === 2) {
            for (let i = 0; i < 100; i++) {
                if (i  < 60) {
                    ctx.globalAlpha = 0;
                } else {
                    // player.filter = 'opacity(100%)';
                    ctx.globalAlpha = 1;

                    // if (i  > 60) {
                    //     i = 0; 
                    // }
                }
            }
        }

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
    
    handleInput(key) { 
        switch(key) {
            case 'up':
            case 'w':
                this.y -= 10;
                break;
            case 'down':
            case 's':
                this.y += 10;
                break;
            case 'left':
            case 'a':
                this.x -= 10;
                break;
            case 'right':
            case 'd':
                this.x += 10;
                break;
            case 'e':
                this.x += 10;
                this.y -= 10;
                break;
            case 'q':
                this.x -= 10;
                this.y -= 10;
                break;
            case 'z':
                this.x -= 10;
                this.y += 10;
                break;
            case 'c':
                this.x += 10;
                this.y += 10;
                break;
        }

        if (key === 'spacebar') {
            // if (this.fireRate === 5) {
                fire(`bullet${this.b}`);
                this.bulletSound.play();
                // this.fireRate = 0;
            // }
            // this.fireRate++;
            this.b++;
        } 
        
    }

    bounds() { 
        if (this.x >= this.maxBoundsX) {
            this.x = 725;
        } else if (this.x <= this.minBoundsX) {
            this.x = 5;
        } 
        
        if (this.y >= this.maxBoundsY) {
            this.y = 545;
        } else if (this.y <= this.minBoundsY) {
            this.y = 0;
        }
    }
}

//Creates an explosion on screen 
class Explosion {
    constructor(x, y) {
        this.explosion = 'images/explosion_v1.png';
        this.x = x;
        this.y = y;
        this.explosionSound = document.getElementById('explosionSound');
    }

    render() {
        ctx.drawImage(Resources.get(this.explosion), this.x, this.y);
    }
}

const game = new Game();

const title = new TitleScreen();
const splashImg = new BG('images/splashScreen_v1.png', 150, 50);
const textTitle = new FlashingText('bold 24px Orbitron, sans-serif', 'Press "Enter" to Begin', 260, 460);



const scroll = new ScrollBG('images/tileable-nebula.png', 0, 0, 0, -600);

const uiBG = new SquareUI(630, 10, 160, 110, 'rgba(255, 255, 255, 1)');
const ui = new SquareUI(635, 15, 150, 100, 'rgba(237, 28, 36, 1)');


function enemyFire() {
    for (let i = 0; i < allEnemies.length; i++){
        if (allEnemies[i].shoots === true) {
            let enemyShot = new EnemyBullet((allEnemies[i].x + 30), (allEnemies[i].y - 10));
            enemyBullets.push(enemyShot);
            enemyShot.shotSound.play();
        }
    }
}

function leadingZero(time) {
    if (time <= 9) {
        time = `0${time}`;
    }
    return time;
}

function fire(name) {
    name = new Bullet((player.x + 30), (player.y - 10));
    bulletArr.push(name);
}

function createExplosion(name, x, y) {
    name = new Explosion(x, y);
    explosionArr.push(name);
    name.explosionSound.play();
}

function delExplosion() {
    explosionArr.pop();
    // delete name;
}

let e = 0;
function bulletChecks() {
    for (let i = 0; i < allEnemies.length; i++) {
        for (let j = 0; j < bulletArr.length; j++) {
            if (bulletArr[j].x < allEnemies[i].x + allEnemies[i].width && 
               bulletArr[j].x + bulletArr[j].width > allEnemies[i].x  &&
               bulletArr[j].y < allEnemies[i].y + allEnemies[i].height &&
               bulletArr[j].y + bulletArr[j].height > allEnemies[i].y) {
                   
                if (allEnemies[i].sprite === 'images/asteroid.png') {
                    score.score += 10;
                }
                if (allEnemies[i].sprite === 'images/enemyShip_v1.png') {
                    score.score += 20;
                }
                if (allEnemies[i].sprite === 'images/enemyShip_v2.png') {
                    score.score += 30;
                }
        
                createExplosion(`explosion${e}`, allEnemies[i].x, allEnemies[i].y);
                e++;

                bulletArr.splice(j, 1);
                // delete allEnemies[i];
                allEnemies.splice(i, 1);
                // delete bulletArr[j];
                
            }
        }
    }
    
    for (let i = 0; i < bulletArr.length; i++) {
        if (bulletArr[i].y < -40) {
            delete bulletArr[i];
            bulletArr.splice(i, 1);
        }
    }
}

function enemyBulletChecks() {
    for (let i = 0; i < enemyBullets.length; i++) {
        if (player.x < enemyBullets[i].x + enemyBullets[i].width && 
            player.x + player.width > enemyBullets[i].x  &&
            player.y < enemyBullets[i].y + enemyBullets[i].height &&
            player.y + player.height > enemyBullets[i].y) {
            player.health--;
            if (player.health > 0) {
                player.shot.play();
            }
            
            if (player.health === 0) {
                createExplosion(`explosion${e}`, player.x, player.y);
                e++;
            }
            
            delete enemyBullets[i];
            enemyBullets.splice(i, 1);
        }
    }
   
    for (let i = 0; i < enemyBullets.length; i++) {
        if (enemyBullets[i].y > 620) {
            delete enemyBullets[i];
            enemyBullets.splice(i, 1);
        }
    }
}


function checkCollision() {
    let h = 0;
    for (let i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + allEnemies[i].width &&
            player.x + player.width > allEnemies[i].x  &&
            player.y < allEnemies[i].y + allEnemies[i].height &&
            player.y + player.height > allEnemies[i].y) {
                
            allEnemies[i].x -= 30;
            allEnemies[i].y -= 30;
        
            player.x += 40;
            player.y += 40;

            /* This is not completely done but could be used for accurate velocity transfers
            if (player.y + player.height <  allEnemies[i].y + allEnemies[i].height) {
                player.y = allEnemies[i].y + allEnemies[i].height;
             } //else if (player.y + player.height >  allEnemies[i].y) {
            //     player.y -= allEnemies[i].y - allEnemies[i].height;
            // }*/

            /* This is not completely done but could be used for accurate velocity transfers
            if (player.x + player.width > allEnemies[i].x + allEnemies[i].width) {
                player.x = allEnemies[i].x + allEnemies[i].width;
            } else if (player.x + player.width < allEnemies[i].x + allEnemies[i].width) {
                player.x = allEnemies[i].x - allEnemies[i].width;
            }*/
            if (player.health === 0) {
                createExplosion(`explosion${e}`, player.x, player.y);
                e++;
            }
            
            if (h % 5 === 0) {
                player.damage.play();
                player.health--;
                h++;
            }
        }
    }
}


function createEnemyShips(name, sprite, x, y) {
    let width,
        length,
        shoots;

    switch(sprite) {
        case 'images/enemyShip_v1.png':
            width = 69;
            length = 79;
            shoots = false;
            break;
        case 'images/enemyShip_v2.png':
            width = 80;
            length = 80;
            shoots = true;
            break;
        case 'images/asteroid.png':
            width = 70;
            length = 90;
            shoots = false;
            break;
    }

    name = new Enemy(sprite, x, y, width, length, shoots);
    allEnemies.push(name);
    
}


function createUpgrades(name, sprite, x, y) {
    let width,
        length;

    switch(sprite) {
        case 'images/GemGreen.png':
            break;
        case 'images/GemBlue.png':
            break;
        case 'images/GemOrange.png':
            break;
    }

    name = new Upgrades(sprite, x, y, 95, 104);
    upgradesArr.push(name);
    
}

const player = new Player(200, 380);

const score = new ScoreText('bold 18px Orbitron, sans-serif', 'Score: ', 640, 40);

const won = new TitleScreen();

const winUI = new SquareUI(170, 220, 520, 250, 'rgba(237, 28, 36, 1)');
const winText = new WinText('bold 24px Orbitron, sans-serif', 'You Conquered the Final Frontier!', 'With a score of ', 180, 300, 280, 350);
const winReturnText = new Text('bold 18px Orbitron, sans-serif', 'Press "Esc" to return to start screen', 240, 450);
const winNewGameText = new FlashingText('bold 18px Orbitron, sans-serif', 'Press "Enter" to play again', 290, 420);

const gameOverUI = new SquareUI(170, 220, 520, 250, 'rgba(0, 0, 0, 1)');
const gameOverText = new Text('bold 28px Orbitron, sans-serif', 'Game Over', 350, 300);
const gameOverText1 = new Text('bold 28px Orbitron, sans-serif', "You're Space Dust!", 300, 335);
const loseNewGameText = new Text('bold 18px Orbitron, sans-serif', 'Press "Enter" to play again', 290, 420);
const loseReturnText = new Text('bold 18px Orbitron, sans-serif', 'Press "Esc" to return to start screen', 240, 450);


const time = new TimeText('bold 18px Orbitron, sans-serif', 'Time: ', 640, 70);

const healthText = new Text('bold 18px Orbitron, sans-serif', 'Health:', 640, 100);
const health = new Health('images/Health.png', 720, 80);

let bullet = new Bullet(player.x, player.y);

const enemy0 = new Enemy('', 0, 0, 0, 0);
let allEnemies = [],
    bulletArr = [],
    enemyBullets = [],
    explosionArr = [],
    upgradesArr = [];


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd',
        69: 'e',
        81: 'q',
        67: 'c',
        90: 'z',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'spacebar',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        27: 'esc',
        13: 'enter'
    };

    title.handleInput(allowedKeys[e.keyCode]);
});