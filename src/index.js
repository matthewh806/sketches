import 'phaser';
import BootScene from './scenes/BootScene.js'
import TitleScene from './scenes/TitleScene.js'
import GameScene from './scenes/GameScene.js'

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#ffb6c1',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 100 }
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene
    ]
};

// TODO: Random chats per day?
// TODO: Somehow just get little conversation strands
// TODO: Night day feature

// TODO: Just about everything else!
var game = new Phaser.Game(config);
