import Phaser from 'phaser'
import levelBgImg from '../assets/images/level-bg.png'
import potImg from '../assets/images/plant-pot.png'
import seedImg from '../assets/images/seed.png'
import waterImg from '../assets/images/water-bucket.png'
import fertilizerImg from '../assets/images/fertilizer.png'
import plantOneImg from '../assets/images/plant-phase1.png'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        // load images
        this.load.image('levelBackground', levelBgImg)
        this.load.image('pot', potImg)
        this.load.image('seed', seedImg)
        this.load.image('watercan', waterImg)
        this.load.image('fertilizer', fertilizerImg)
        this.load.image('plantOne', plantOneImg)
    }

    create() {
        // add background image, centered
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelBackground').setOrigin(0.5).setDisplaySize(this.scale.width, this.scale.height)

        this.pot = this.add.image(220, 350, 'pot').setOrigin(0.5, 0.5)
        this.water = this.add.image(270, 275, 'watercan').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', pixelPerfect: true })
        this.fertilizer = this.add.image(270, 265, 'fertilizer').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', pixelPerfect: true })
        this.seed = this.add.image(100, 100, 'seed').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', pixelPerfect: true })

        this.input.setDraggable(this.water)
        this.input.setDraggable(this.fertilizer)
        this.input.setDraggable(this.seed)

        this.input.on('dragstart', (pointer, gameObject) => {
            // slight transparency when dragging
            gameObject.setAlpha(0.5)
        });

        this.input.on('dragend', (pointer, gameObject) => {
            // restore opacity after dragging
            gameObject.setAlpha(1)
        });

        // TODO: drag and drop stuff doesn't work
        this.input.on('dragdrop', (pointer, gameObject, dropZone) => {
            if (gameObject === this.seed || gameObject === this.fertilizer) {
                // Check if both seed and fertilizer are dropped on the pot
                if (this.checkDropSuccess()) {
                    this.createPlant()
                }
            }
        });
    }

    // Function to check if both seed and fertilizer are dropped on the pot
    checkDropSuccess() {
        const seedOverPot = Phaser.Geom.Intersects.RectangleToRectangle(this.seed.getBounds(), this.pot.getBounds())
        const fertilizerOverPot = Phaser.Geom.Intersects.RectangleToRectangle(this.fertilizer.getBounds(), this.pot.getBounds())

        return seedOverPot || fertilizerOverPot
    }

    // Function to create the plant when conditions are met
    createPlant() {
        if (!this.plantCreated) {
            this.add.image(225, 350, 'plantOne').setOrigin(0.5, 0.5)
            this.plantCreated = true
        }
    }
}