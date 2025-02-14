import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: [TitleScene, GameScene],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

// Start the game with Phaser
new Phaser.Game(config);