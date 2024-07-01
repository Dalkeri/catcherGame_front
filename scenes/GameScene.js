import UIManager from '../objects/UIManager.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.add.image(0, -50, 'background').setOrigin(0,0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.uiManager = new UIManager(this);
        this.uiManager.addLogo();
        this.uiManager.addScore();
        this.uiManager.addTimer();
        this.uiManager.addTargetColor();

        this.colors = ['red', 'yellow', 'green', 'blue', 'orange'];
        this.colorsHex= {
            'red':'0xff0000', 
            'yellow':'0xffff00', 
            'green':'0x008000', 
            'blue': '0x0000ff', 
            'orange': '0xffa500'
        };
        this.targetColor = Phaser.Math.RND.pick(this.colors);
        this.uiManager.updateColor(this.targetColor, this.colorsHex[this.targetColor]);

        this.player = this.physics.add.sprite(this.cameras.main.width/2, this.cameras.main.height - 50, 'player')
                                      .setScale(0.5)
                                      .setCollideWorldBounds(true);

        this.fallingMMs = this.physics.add.group();

        this.time.addEvent({
            delay: Phaser.Math.Between(250, 500),
            callback: this.createRandomMM,
            callbackScope: this,
            loop: true
        });
            
        this.physics.add.collider(this.player, this.fallingMMs, this.catchMM, null, this);

        this.score = 0;
        this.streak = 0;
        this.timer = 60;

        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.input.setDefaultCursor('default');
        this.input.on('pointermove', (pointer) => {
                this.player.x = pointer.x;
        });
    }

    update() {
        if (this.timer <= 0) {
            this.scene.start('ScoreScene', { score: this.score });
        }

        this.fallingMMs.children.iterate((child) => {
            if (child && child.y > this.cameras.main.height) {
                this.removeFallingMM(child);
            }
        });
    }

    createRandomMM(){
        const color = Phaser.Math.RND.pick(this.colors);
        let fallingMM = this.physics.add.sprite(Phaser.Math.Between(this.uiManager.targetColor.displayWidth/2, this.cameras.main.width - this.uiManager.targetColor.displayWidth), Phaser.Math.Between(-100, -10), color);

        fallingMM.setScale(0.05);
        fallingMM.setVelocityY(Phaser.Math.Between(50, 150));
        fallingMM.setDepth(-1);

        this.fallingMMs.add(fallingMM);
    }

    removeFallingMM(mm) {
        mm.destroy();
    }

    catchMM(player, mm) {
        // detect collision, check the MM is coming from above and not sides
        if (mm.x > player.x - player.width/2 && player.x+player.width/2 > mm.x &&  player.y - (player.height*player._scaleY)/2 - 20 < mm.y + (mm.height*mm._scaleY)/2
            && player.y - (player.height*player._scaleY)/2 > mm.y - (mm.height*mm._scaleY)/2
        ){
            this.fx = this.player.preFX.addGlow(this.colorsHex[mm.texture.key], 2, 0, false, 0.1, 15);
            this.time.addEvent({
                delay: 300,
                callback: this.destroyFX,
                callbackScope: this,
                loop: true
            });

            if (mm.texture.key === this.targetColor) {
                this.streak++;
                this.score += 10 * this.streak;
                this.targetColor = Phaser.Math.RND.pick(this.colors);
                this.uiManager.updateColor(this.targetColor, this.colorsHex[this.targetColor]);
            } else {
                this.streak = 0;
                this.score += 1;
            }
            this.removeFallingMM(mm);
        }      

        this.uiManager.updateScore(this.score);
    }

    destroyFX(){
        this.player.preFX.remove(this.fx);
    }

    updateTimer() {
        this.timer--;
        this.uiManager.updateTimer(this.timer);
    }
}
