class Game {
    constructor() {
        this.titleBG = 'images/blue_space_scape_by_heatstroke99-d331bty.png';
        this.run = true;
        this.gameState = 0;
        this.x = 0;
        this.y = 0;
        this.flash = 0;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.titleBG), this.x, this.y);
        ctx.globalAlpha = 1.0;
        if (this.flash < 40) {
            // debugger;
            ctx.globalAlpha = 0;
            this.flash++;
        } else {
            ctx.globalAlpha = 1;

            if (this.flash  > 80) {
                this.flash = 0; 
            }
            this.flash++;
             
        }
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
        this.flash = 0;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.titleBG), this.x, this.y);
        ctx.globalAlpha = 1.0;
        if (this.flash < 40) {
            // debugger;
            ctx.globalAlpha = 0;
            this.flash++;
        } else {
            ctx.globalAlpha = 1;

            if (this.flash  > 80) {
                this.flash = 0; 
            }
            this.flash++;
             
        }
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

class BG {
    constructor(x, y) {
        this.bg = 'images/tileable-nebula.png';
        this.x = x;
        this.y = y;
    }

    scroll(dt) {
        this.y += 0.2;

        if (this.y > 600) {
            this.y = -599;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.bg), this.x, this.y);
    }
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

class UI extends BG {
    constructor(x, y, width, height, colorFill) {
        super(x, y);
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
class Text extends BG {
    constructor(font, text, x, y) {
        super(x, y);
        this.score = 0;
        this.text = text;
        this.font = font;
    }

    render() {
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
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.minBoundsX = 0;
        this.maxBoundsX = 725;
        this.i = 0;
        this.s = 0;
        this.moveX = 0;
        // this.minBoundsY = 0;
        // this.maxBoundsY = 520;
    }

    update(dt) {
        this.y += this.speed;

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
        if (time.timer[1] === 10) {
            // let z = true;

            // if (z === true && time.timer[1] === 10) {
            //     z = false;
                let stepX = 0;
                for(let i = 6; i < 11; i++) {
                    createEnemyShips(`enemies${this.s}`, stepX,  0);
                    stepX += 150;
                    this.s++;
                }
            // } 
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
        this.bullet = 'images/Key.png';
        this.x = x;
        this.y = y;
        this.width = 45;
        this.height = 85;
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
        this.sprite = 'images/char-horn-girl.png';
        this.particle = 'images/particleBlue.png';
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.minBoundsX = 0;
        this.maxBoundsX = 725;
        this.minBoundsY = 0;
        this.maxBoundsY = 520;
        this.health = 3;
        this.moveSound = document.getElementById("moveSound");
    }

    update(dt) {
    }
    
    render(dt) {
        
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
            this.x = 0;
        } 
        
        if (this.y >= this.maxBoundsY) {
            this.y = 520;
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
const textTitle = new Text("bold 24px Orbitron, sans-serif", "Press 'Enter' to Begin", 280, 300);







const bg = new BG(0, 0);

const bg1 = new BG(0, -600);

const uiBG = new UI(630, 10, 160, 110, 'rgba(255, 255, 255, 0.75)');
const ui = new UI(635, 15, 150, 100, 'rgba(0, 168, 120, 0.75)');


const bulletArr = [];
const explosionArr = [];

function leadingZero(time) {
    if (time <= 9) {
      time = `0${time}`;
    }
    return time;
  }

function fire(name) {
    name = new Bullet((player.x + 30), player.y - 40);
    bulletArr.push(name);
     //  this.moveSound.play();
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


function bulletChecks() {
    let e = 0;
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
            // console.log(`Hit detected! Enemy ${i} hit me in allEnemies array`);
            // allEnemies[i].x -= 25;
            // allEnemies[i].y -= 25;
            
            // player.x += 25;
            // player.y += 25;
            if (player.y + player.height <  allEnemies[i].y + allEnemies[i].height) {
                player.y = allEnemies[i].y + allEnemies[i].height;
             } //else if (player.y + player.height >  allEnemies[i].y) {
            //     player.y -= allEnemies[i].y - allEnemies[i].height;
            // }
            if (player.x + player.width > allEnemies[i].x + allEnemies[i].width) {
                player.x = allEnemies[i].x + allEnemies[i].width;
            } else if (player.x + player.width < allEnemies[i].x + allEnemies[i].width) {
                player.x = allEnemies[i].x - allEnemies[i].width;
            }
            
            
            if (h % 5 === 0) {
                player.health--;
                h++;
            }

            console.log(`Health after hit: ${player.health}`);
        }
    }
}


function createEnemyShips(name, x, y) {
    name = new Enemy('images/enemy-bug.png', x, y, 100, 70);
    allEnemies.push(name);
}

const player = new Player(200, 380);

const score = new ScoreText("bold 18px Orbitron, sans-serif", "Score: ", 640, 40);

const won = new Game();

const winText = new WinText("bold 24px Orbitron, sans-serif", "You've Conquered the Final Frontier!", "With a score of ", 180, 300, 260, 350);

const time = new TimeText("bold 18px Orbitron, sans-serif", "Time: ", 640, 60);

let bullet = new Bullet(player.x, player.y);

const randSpeed1 = Math.floor(Math.random() * 6) + 1,
      randSpeed2 = Math.floor(Math.random() * 6) + 1,
      randSpeed3 = Math.floor(Math.random() * 6) + 1;

const enemy0 = new Enemy('', 0, 0, 0, 0),
      enemy1 = new Enemy('images/enemy-bug.png', 0, 60, 100, 70),
      enemy2 = new Enemy('images/enemy-bug.png', 300, 140, 100, 70),
      enemy3 = new Enemy('images/enemy-bug.png', 100, 140, 100, 70),
      enemy4 = new Enemy('images/enemy-bug.png', 215, 220, 100, 70),
      enemy5 = new Enemy('images/Rock.png', 415, 220, 87, 86),
      allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
console.log(`enemy1 speed: ${enemy1.speed}`);
console.log(`enemy2 speed: ${enemy2.speed}`);
console.log(`enemy3 speed: ${enemy3.speed}`);
console.log(`enemy4 speed: ${enemy4.speed}`); 
console.log(`enemy5 speed: ${enemy5.speed}`); 

// if (time.timer[1] > 15) {
//     let z = 0;
//     if (z < 1) {
//         let stepX = 0;
//         for(let i = 6; i < 11; i++) {
//             createEnemyShips(`enemy${i}`, stepX,  0);
//             stepX += 150;
//         }
//         z++;
//     }
    
// }


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

