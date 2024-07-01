import UIManager from '../objects/UIManager.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('bootBackground', 'assets/BG.png');
        this.load.image('catchphrase', 'assets/purpose-footer-with-purple-desktop.webp')
    }

    create() {
        this.add.image(0, 0, 'bootBackground').setOrigin(0,0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.uiManager = new UIManager(this);
        this.uiManager.addLogo();

        let catchPhrase = this.add.image(0, 0, 'catchphrase');
        catchPhrase.x = this.cameras.main.width / 2;
        catchPhrase.y = this.cameras.main.height / 2;
        catchPhrase.setScale(0.2)

        let startButton = document.getElementById("startButton");
        startButton.setAttribute('style', 'width:'+this.cameras.main.width/1.5+"px");
        startButton.addEventListener('click', () =>{
            this.scene.start('PreloadScene');
            startButton.style.display = "none";
        })
    }
}
