import Phaser from 'phaser'
import TitleScene from './scenes/TitleScene'
import LevelScene from './scenes/LevelScene'
import FertScene from './scenes/FertilizerScene'
import WaterScene from './scenes/WaterScene'

const config = {
    type: Phaser.AUTO,
    width: 622,
    height: 648,
    scene: [TitleScene, LevelScene, FertScene, WaterScene],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

// Start the game with Phaser
const game = new Phaser.Game(config);