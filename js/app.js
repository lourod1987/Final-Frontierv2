class Game {
    constructor() {
        this.run = true;
        this.gameState = 0;
    }
        
    handleInput(key) {
        switch(key) {
            case 'enter':
                // this.run = false;
                this.gameState = 1;
                break;
            case 'esc':
                this.gameState = 0;
                break;
        }
    }
}

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

    }
}


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


class Health extends BG {
    constructor(bg, x, y, x1, y1, x2, y2) {
        super(bg, x, y);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    render() {
        if (player.health > 0) {
            ctx.drawImage(Resources.get(this.bg), this.x, this.y);
        }
        if (player.health > 1) {
            ctx.drawImage(Resources.get(this.bg), this.x1, this.y1);
        }
        if (player.health > 2) {
            ctx.drawImage(Resources.get(this.bg), this.x2, this.y2);
        }
    }
}


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


//change the class title names and inheritence around for text classes
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
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
    }
}

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
        ctx.fillStyle = "white";

        ctx.fillText(this.text, this.x, this.y);
    }
}


class ScoreText extends Text {
    constructor(font, text, x, y) {
        super(font, text, x, y);
        this.score = 0;
        
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = "white";
        
        ctx.fillText(this.text + this.score, this.x, this.y);
    }
}


class WinText extends Text {
    constructor(font, text, text1, x, y, x1, y1) {
        super(font, text, x, y);
        this.text1 = text1;
        this.x1 = x1;
        this.y1 = y1;
    }

    render() {
        ctx.font= this.font;
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
        ctx.fillText(this.text1 + score.score,  this.x1, this.y1);
    }
}


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
        ctx.fillStyle = "white";
        ctx.fillText(this.text + leadingZero(this.timer[0]) + ":" + leadingZero(this.timer[1]), this.x, this.y);
    }

    leadingZero(time) {
        if (time <= 9) {
            time = `0${time}`;
          }
          return time;
    }
}


class Enemy {
    constructor(sprite, x, y, width, height) {
        this.sprite = sprite;
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

    spawn() {
        if (time.timer[1] === 5) {
            let stepX = 0;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 20) {
            let stepX = 0;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 30) {
            let stepX = 0;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 40) {
            let stepX = 0;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[1] === 50) {
            let stepX = 0;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  0);
                stepX += 150;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 0) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  stepY);
                stepX += 200;
                stepY += 20;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 10) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  stepY);
                stepX += 200;
                stepY += 20;
                this.s++;
            }
        }

        if (time.timer[0] === 1 && time.timer[1] === 20) {
            let stepX = 0;
            let stepY = -80;
            for(let i = 6; i < 11; i++) {
                createEnemyShips(`enemies${this.s}`, stepX,  stepY);
                stepX += 200;
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
        this.bulletSound = document.getElementById("bulletSound");
        this.i = 0;
    }

    update() {
        this.y -= 5;
    }

    render(key) {
        ctx.drawImage(Resources.get(this.bullet), this.x, this.y);
    }

    handleInput(key) {
        if (key === 'spacebar' /*&& this.i % 2 === 0*/) {
            fire(`bullet${this.i}`);
            this.bulletSound.play();
            console.log(`bullet${this.i}`);
            
        }
        this.i++;
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


class Player {
    constructor(x, y) {
        this.sprite = 'images/playerShip_v3.png';
        this.particle = 'images/particleBlue.png';
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 40;
        this.minBoundsX = 5;
        this.maxBoundsX = 725;
        this.minBoundsY = 0;
        this.maxBoundsY = 545;
        this.health = 3;
        // this.moveSound = document.getElementById("moveSound");
        this.damage = document.getElementById("playerHit");
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
            for (let i = 0; i < 100; i++)
                if (i  < 30) {
                    ctx.globalAlpha = 0;
                } else {
                    // player.filter = 'opacity(100%)';
                    ctx.globalAlpha = 1;

                    // if (i  > 60) {
                    //     i = 0; 
                    // }
            }
        }

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }

     handleInput(key) {
       /* if (key === 'up' || key === 'w') {
            if (key === 'w' && key === 'd') {
                this.y -= 8;
                this.x += 8;
            }
            this.y -= 8;
            // console.log(`current yPos Player: ${this.y}`);
            //  this.moveSound.play();
        }
        
        if (key === 'down' || key === 's') {
            this.y += 8;
            // console.log(`current yPos Player: ${this.y}`);
            //  this.moveSound.play();
        }
        
        if (key === 'left' || key === 'a') {
            this.x -= 10;
            // console.log(`current xPos Player: ${this.x}`);
            //  this.moveSound.play();
        }

        if (key === 'right' || key === 'd') {
            this.x += 10;
            // console.log(`current xPos Player: ${this.x}`);
            //  this.moveSound.play();
        }*/

        switch(key) {
            case 'up':
            case 'w':
                this.y -= 8;
                // console.log(`current yPos Player: ${this.y}`);
                //  this.moveSound.play();
                break;
            case 'down':
            case 's':
                this.y += 8;
                // console.log(`current yPos Player: ${this.y}`);
                //  this.moveSound.play();
                break;
            case 'left':
            case 'a':
                this.x -= 10;
                //  this.moveSound.play();
                break;
            case 'right':
            case 'd':
                this.x += 10;
                //  this.moveSound.play();
                break;
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


class Explosion {
    constructor(x, y) {
        this.explosion = 'images/explosion.png';
        this.x = x;
        this.y = y;
        this.explosionSound = document.getElementById("explosionSound");
    }

    render() {
        ctx.drawImage(Resources.get(this.explosion), this.x, this.y);
    }
}

const game = new Game();

const title = new TitleScreen();
const splashImg = new BG('images/splashScreen_v1.png', 150, 50);
const textTitle = new FlashingText("bold 24px Orbitron, sans-serif", "Press 'Enter' to Begin", 260, 460);



const scroll = new ScrollBG('images/tileable-nebula.png', 0, 0, 0, -600);

const uiBG = new SquareUI(630, 10, 160, 110, 'rgba(255, 255, 255, 1)');
const ui = new SquareUI(635, 15, 150, 100, 'rgba(237, 28, 36, 1)');


const bulletArr = [];
const explosionArr = [];

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

function delExplosion(name) {
    explosionArr.pop();
    delete name;
}

function createExplosion(name, x, y) {
    name = new Explosion(x, y);
    explosionArr.push(name);
    name.explosionSound.play();
}

let e = 0;
function bulletChecks() {
    
    for (let i = 0; i < allEnemies.length; i++) {
        for (let j = 0; j < bulletArr.length; j++) {
           if (bulletArr[j].x < allEnemies[i].x + allEnemies[i].width && 
               bulletArr[j].x + bulletArr[j].width > allEnemies[i].x  &&
               bulletArr[j].y < allEnemies[i].y + allEnemies[i].height &&
               bulletArr[j].y + bulletArr[j].height > allEnemies[i].y) {
                   console.log(`Bullet ${bulletArr[i]} hit Enemy ${allEnemies[i]}`);
                   score.score += 10;
                   console.log(`Player score is now ${player.score} for destroying Enemy ${allEnemies[i]}`);
                   createExplosion(`explosion${e}`, allEnemies[i].x, allEnemies[i].y);
                   e++;
                   
                   allEnemies.splice(i, 1);
                   bulletArr.splice(j, 1);      
           }
        }
   }

   for (let i = 0; i < bulletArr.length; i++) {
       if (bulletArr[i].y < -40) {
            bulletArr.splice(i, 1);
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
                
                allEnemies[i].x -= 25;
                allEnemies[i].y -= 25;
            
                player.x += 25;
                player.y += 25;

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
            
            if (h % 5 === 0) {
                player.damage.play();
                player.health--;
                h++;
            }
        }
    }
}


function createEnemyShips(name, x, y) {
    name = new Enemy('images/enemyShip.png', x, y, 75, 80);
    allEnemies.push(name);
}

const player = new Player(200, 380);

const score = new ScoreText("bold 18px Orbitron, sans-serif", "Score: ", 640, 40);

const won = new TitleScreen();

const winUI = new SquareUI(170, 220, 520, 250, 'rgba(237, 28, 36, 1)');
const winText = new WinText("bold 24px Orbitron, sans-serif", "You've Conquered the Final Frontier!", "With a score of ", 180, 300, 280, 350);
const winReturnText = new Text("bold 18px Orbitron, sans-serif", "Press 'Esc' to return to start screen", 240, 450);
const winNewGameText = new FlashingText("bold 18px Orbitron, sans-serif", "Press 'Enter' to play again", 290, 420);


const time = new TimeText("bold 18px Orbitron, sans-serif", "Time: ", 640, 70);

const healthText = new Text("bold 18px Orbitron, sans-serif", "Health:", 640, 100);
const health = new Health('images/Health.png', 720, 80, 732, 80, 744, 80);

let bullet = new Bullet(player.x, player.y);

const enemy0 = new Enemy('', 0, 0, 0, 0),
      allEnemies = [];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
        32: 'spacebar',
        13: 'enter'
    };

    
    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'spacebar',
        13: 'enter'
    };

    bullet.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        27: 'esc',
        13: 'enter'
    };

    // title.handleInput(allowedKeys[e.keyCode]);
    game.handleInput(allowedKeys[e.keyCode]);
});

// setTimeout( () => {
//     let t = 1;
//     while (t > 0) {
//         (function (e) {
//             var allowedKeys = {
//                 32: 'spacebar'
//             };
        
//             bullet.handleInput(allowedKeys[e.keyCode]);
        
//         })();
//         t++;
//     }
// }, 400);

