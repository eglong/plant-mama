import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import LevelScene from './scenes/LevelScene';

const config = {
    type: Phaser.AUTO,
    width: 623,
    height: 648,
    scene: [TitleScene, LevelScene],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

// Start the game with Phaser
const game = new Phaser.Game(config);