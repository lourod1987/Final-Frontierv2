class BG {
    constructor(x, y) {
        this.bg = 'images/blue_space_scape_by_heatstroke99-d331bty.png';
        this.x = x;
        this.y = y;
    }

    scroll() {
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

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
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

class Text extends BG {
    constructor(score, x, y) {
        super(x, y);
        this.score = score;
    }

    update() {
        ctx.fillText(this.score, this.x, this.y);
    }

    render() {
        ctx.font="bold 24px Verdana, san-serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.score, this.x, this.y);
    }
}

class Enemy {
    constructor(sprite, x, y, width, height) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.minBoundsX = 0;
        this.maxBoundsX = 725;
        // this.minBoundsY = 0;
        // this.maxBoundsY = 520;
    }

    update(dt) {
        this.y += this.speed;

        if (this.y > 600) {
            this.y = -20;
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
        if (key === 'spacebar' && this.i % 2 === 0) {
            fire(`bullet${this.i}`);
            bullet.bulletSound.play();
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
        this.score = 0;
        this.moveSound = document.getElementById("moveSound");
        
    }

    update(dt) {
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

     handleInput(key) {
        if (key === 'up' || key === 'w') {
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
        }

        /*switch(key) {
            case 'up':
            case 'w':
                 this.y -= 8;
                 console.log(`current yPos Player: ${this.y}`);
                //  this.moveSound.play();
                 break;
             case 'down':
             case 's':
                     this.y += 8;
                     console.log(`current yPos Player: ${this.y}`);
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
         } */
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
        this.explosion = 'images/particleBlue.png';
        this.x = x;
        this.y = y;
        this.explosionSound = document.getElementById("explosionSound");
    }

    render() {
        ctx.drawImage(Resources.get(this.explosion), this.x, this.y);
    }
}


const bg = new BG(0, 1);
const bg1 = new BG(0, -599);

const uiBG = new UI(630, 10, 160, 110, 'rgba(255, 255, 255, 0.75)');
const ui = new UI(635, 15, 150, 100, 'rgba(0, 168, 120, 0.75)');


const bulletArr = [];
const explosionArr = [];

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
                   player.score += 10;
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
            allEnemies[i].x -= 50;
            allEnemies[i].y -= 50;
            
            player.x += 50;
            player.y += 50;
            if (h % 5 ===0) {
                player.health--;
                h++;
            }
            console.log(`Health after hit: ${player.health}`);
        }
    }
}


const player = new Player(200, 380);

const uiText = new Text(`Score: ${player.score}`, 650, 40);

let bullet = new Bullet(player.x, player.y);

const randSpeed1 = Math.floor(Math.random() * 6) + 1,
      randSpeed2 = Math.floor(Math.random() * 6) + 1,
      randSpeed3 = Math.floor(Math.random() * 6) + 1;

const enemy1 = new Enemy('images/enemy-bug.png', 0, 60, 100, 70),
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
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);

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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'spacebar'
    };

    bullet.handleInput(allowedKeys[e.keyCode]);

});
