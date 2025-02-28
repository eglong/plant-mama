import Phaser from 'phaser'
import TitleScene from './scenes/TitleScene'
import LevelScene from './scenes/LevelScene'
import FertScene from './scenes/FertilizerScene'
import WaterScene from './scenes/WaterScene'

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 300,
            height: 300
        },
        max: {
            width: 600,
            height: 600
        }
    },
    scene: [TitleScene, LevelScene, FertScene, WaterScene],
};

// Start the game with Phaser
const game = new Phaser.Game(config);