import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'
import FertScene from './scenes/FertilizerScene'
import WaterScene from './scenes/WaterScene'

const config = {
    type: Phaser.AUTO,
    width: 623,
    height: 648,
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
    scene: [MenuScene, GameScene, FertScene, WaterScene],
};

// Start the game with Phaser
const game = new Phaser.Game(config);
