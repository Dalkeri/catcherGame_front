import UIManager from '../objects/UIManager.js';

export default class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ScoreScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    preload(){
        this.load.image('background_score', 'assets/BGFINAL.png');
        this.load.image('characters', 'assets/mms-mission-characters-desktop.png');
    }

    create() {
        this.add.image(0, 0, 'background_score').setOrigin(0,0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.uiManager = new UIManager(this);
        this.uiManager.addLogo();

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 4.5, "SCORE:", {
            fontFamily: 'Eider-Regular',
            fontSize: '20px',
            fill: '#000000',
            stroke: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.timeValue = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3.5, this.finalScore, {
            fontFamily: 'Eider-Regular',
            fontSize: '50px',
            fill: '#000000',
            stroke: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.sendButton = document.getElementById("sendButton");
        sendButton.setAttribute('style', 'width:'+this.cameras.main.width/1.5+"px; display: block");
        sendButton.addEventListener('click', () =>{
            this.promptForPlayerName(this.finalScore);
        })

        this.characters = this.add.image(this.cameras.main.width / 2, this.cameras.main.height/2 + this.cameras.main.height / 3.5, 'characters');
        this.characters.setScale(0.15);

        this.getTopScores();
        this.topScores = []; 
        
        this.shareText = `J'ai fait ${this.finalScore} sur le super jeu M&M's, essaye de me battre! <url>`;

        this.shareButton = document.getElementById("shareButton");
        shareButton.setAttribute('style', 'width:'+this.cameras.main.width/3+"px;display: block;");

        shareButton.addEventListener('click', () =>{
            navigator.clipboard.writeText(this.shareText);
            this.clipboardCopy = this.add.text(this.cameras.main.width / 4, this.cameras.main.height - this.cameras.main.height / 11, "✓ Copied to clipboard", {
                fontFamily: 'Eider-Regular',
                fontSize: '15px',
                fill: '#000000',
                stroke: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
            this.time.addEvent({
                delay: 1000,
                callback: () => {this.clipboardCopy.destroy()},
                callbackScope: this,
                loop: true
            });
        })

        this.replayButton = document.getElementById("replayButton");
        replayButton.setAttribute('style', 'width:'+this.cameras.main.width/3+"px;display: block;");

        replayButton.addEventListener('click', () =>{
            this.shareButton.style.display = "none";
            this.replayButton.style.display= "none";
            this.sendButton.style.display  = "none";
            this.scene.start('PreloadScene');
        })     
    }

    promptForPlayerName(score) {
        console.log("promp");
        let playerName = prompt("Enter your username:");
        if (playerName) {
          this.submitScore(playerName, score);
        } else {
          console.log("Pseudo non saisi.");
        }
    }

    submitScore(playerName, score) {
        fetch('http://localhost:3000/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerName, score })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Score ajouté:', data);
            this.sendButton.style.display = "none";
            this.getTopScores();
        })
        .catch(error => console.error('Erreur:', error));
    }

    getTopScores() {
        fetch('http://localhost:3000/scores/top5')
        .then(response => response.json())
        .then(data => {
          console.log('Top 5 scores:', data);
          this.displayTopScores(data);
        })
        .catch(error => console.error('Erreur:', error));
    }

    displayTopScores(scores) {
        this.deleteTopScores();
        scores.forEach((score, index) => {
            this.topScores.push(this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.2 + 30*index, score.playerName + "............................." + score.score, {
                fontFamily: 'Eider-Regular',
                fontSize: '25px',
                fill: '#000000',
                stroke: '#ffffff',
                strokeThickness: 4,
                align: 'center'
            }).setOrigin(0.5));
        });
    }

    deleteTopScores(){
        this.topScores.forEach( (score) =>{
            score.destroy();
        });
    }
}
