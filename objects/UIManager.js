export default class UIManager {
    constructor(scene) {
        this.scene = scene;
    }

    addLogo(){
        this.logo = this.scene.add.image(0, 0, 'logo');
        this.logo.x = this.scene.cameras.main.width / 2;
        this.logo.y = this.scene.cameras.main.height / 20;
        this.logo.setScale(0.05);
        this.logo.setDepth(2);
    }

    addScore(){  
        this.scene.add.text(this.scene.cameras.main.width - this.scene.cameras.main.width / 5, this.scene.cameras.main.height / 22, "Score", {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            stroke: '#ffffff',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        this.scoreValue = this.scene.add.text(this.scene.cameras.main.width - this.scene.cameras.main.width / 5, this.scene.cameras.main.height / 15, "0", {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            stroke: '#ffffff',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }

    updateScore(newScore) {
        this.score = newScore;
        this.scoreValue.setText(`${this.score}`);
    }


   addTimer(){
        this.scene.add.text(this.scene.cameras.main.width / 5, this.scene.cameras.main.height / 22, "TIME", {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            stroke: '#ffffff',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        this.timeValue = this.scene.add.text(this.scene.cameras.main.width / 5, this.scene.cameras.main.height / 15, "60", {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            stroke: '#ffffff',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }

    updateTimer(newTime) {
        this.timer = newTime;
        this.timeValue.setText(`${this.timer}`);
    }

    addTargetColor(){
        this.targetColor = this.scene.add.image(this.scene.cameras.main.width/2, this.scene.cameras.main.height / 9, 'red');
        this.targetColor.setScale(0.05);

        const circle = new Phaser.Geom.Circle(this.scene.cameras.main.width/2, this.scene.cameras.main.height/9, 30);
        const graphics = this.scene.add.graphics({ fillStyle: { color: '0xffffff' } });
        graphics.fillCircleShape(circle);
        graphics.setDepth(1);  
        this.targetColor.setDepth(2); 
    }

    updateColor(newColor, newColorHex){
        this.targetColor.preFX.remove(this.fx);
        this.targetColor.setTexture(newColor);
        this.fx = this.targetColor.preFX.addGlow(newColorHex, 1, 0, false, 0.1, 15);
    }

}
