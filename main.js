import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import ScoreScene from './scenes/ScoreScene.js';
import TutorialScene from './scenes/TutorialScene.js';

const config = {
    type: Phaser.AUTO,
    width: 430,
    height: 932,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    fx: {
        glow: {
            distance: 10,
            quality: 0.1
        }
    },
    scene: [BootScene, PreloadScene, TutorialScene, GameScene, ScoreScene]
};

const game = new Phaser.Game(config);
