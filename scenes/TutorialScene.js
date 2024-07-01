import UIManager from '../objects/UIManager.js';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    create() {
        this.add.image(0, -50, 'background').setOrigin(0,0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.uiManager = new UIManager(this);
        this.uiManager.addLogo();
        this.uiManager.addScore();
        this.uiManager.addTimer();
        this.uiManager.addTargetColor();

        this.colors = ['red', 'yellow', 'green', 'blue', 'orange'];
        this.randomColor = Phaser.Math.RND.pick(this.colors);
        let targetColor = this.add.image(this.cameras.main.width/2, this.cameras.main.height / 9, this.randomColor);
        targetColor.setScale(0.05);
  
        const circle = new Phaser.Geom.Circle(this.cameras.main.width/2, this.cameras.main.height/9, 25);
        const graphics = this.add.graphics({ fillStyle: { color: '0xffffff' } });
        graphics.fillCircleShape(circle);
        graphics.setDepth(1);  
        targetColor.setDepth(2);  

        let arrow = this.add.image(0,0,'arrow');
        arrow.x = this.cameras.main.width / 2;
        arrow.y = this.cameras.main.height / 4.5;
        arrow.setScale(0.4);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, ["CATCHES THE M&M's","OF THE COLOR","THAT APPEARS HERE","FOR MORE POINTS"], {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);


        let hand = this.add.image(0, 0, 'hand');
        hand.x = this.cameras.main.width / 2;
        hand.y = this.cameras.main.height - this.cameras.main.height / 4;
        hand.setScale(0.08);

        this.player = this.physics.add.sprite(this.cameras.main.width/2, this.cameras.main.height - 50, 'player').setScale(0.5).setCollideWorldBounds(true);

        this.input.setDefaultCursor('pointer');
        this.input.once('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
