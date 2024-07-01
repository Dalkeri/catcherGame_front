export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('background', 'assets/BG_JAUNEBLANC.png');
        this.load.image('player', 'assets/container.png');
        this.load.image('red', 'assets/rouge.png');
        this.load.image('yellow', 'assets/jaune.png');
        this.load.image('green', 'assets/vert.png');
        this.load.image('blue', 'assets/bleu.png');
        this.load.image('orange', 'assets/orange.png');
        this.load.image('arrow', 'assets/flèche.png');
        this.load.image('hand', 'assets/ICON_SWIPE.png');
    }

    create() {
        this.scene.start('TutorialScene');
    }
}
