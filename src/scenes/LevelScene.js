import Phaser from 'phaser'
import levelBgImg from '../assets/images/level-bg.png'
import potImg from '../assets/images/plant-pot.png'
import seedImg from '../assets/images/seed.png'
import waterImg from '../assets/images/water-bucket.png'
import fertilizerImg from '../assets/images/fertilizer.png'
import plantOneImg from '../assets/images/plant-phase1.png'
import plantTwoImg from '../assets/images/plant-phase2.png'
import sunImg from '../assets/images/sun.png'
import soilImg from '../assets/images/soil.png'

export default class LevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelScene' })
    }

    preload() {
        // load images
        this.load.image('levelBackground', levelBgImg)
        this.load.image('pot', potImg)
        this.load.image('seed', seedImg)
        this.load.image('watercan', waterImg)
        this.load.image('fertilizer', fertilizerImg)
        this.load.image('plantOne', plantOneImg)
        this.load.image('plantTwo', plantTwoImg)
        this.load.image('sun', sunImg)
        this.load.image('soil', soilImg)
    }

    create() {
        // add background and images
        this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelBackground').setOrigin(0.5).setDisplaySize(this.scale.width, this.scale.height)
        this.fertilizer = this.add.image(50, 200, 'fertilizer').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.water = this.add.image(50, 130, 'watercan').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.sun = this.add.image(50, 50, 'sun').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.seed = this.add.image(50, 260, 'seed').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true })
        this.plantOne = this.add.image(275, 450, 'plantOne').setOrigin(0.5, 0.5).setVisible(false)
        this.plantTwo = this.add.image(275, 420, 'plantTwo').setOrigin(0.5, 0.5).setVisible(false)
        this.soil = this.add.image(275, 469, 'soil').setOrigin(0.5, 0.5).setVisible(false)
        this.pot = this.add.image(275, 500, 'pot').setOrigin(0.5, 0.5)
        const ogSeedPos = {
            x: this.seed.x,
            y: this.seed.y
        }

        // check if items have been added
        this.checkItemCompletion()

        this.fertilizer.on('pointerdown', () => {
            this.scene.start('FertScene')
        })

        // temporary
        this.water.on('pointerdown', () => {
            this.registry.set('waterCollected', true)
            this.checkItemCompletion()
        })
        this.sun.on('pointerdown', () => {
            this.registry.set('sunCollected', true)
            this.checkItemCompletion()
        })

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setAlpha(0.5)
        })

        this.input.on('drag', (pointer, gameObject, x, y) => {
            gameObject.x = x
            gameObject.y = y
        })

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setAlpha(1)

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.seed.getBounds(), this.pot.getBounds())) {
                this.seed.x = 275
                this.seed.y = 465
                this.registry.set('seedAdded', true)
                this.seed.disableInteractive()
            } else {
                this.seed.x = ogSeedPos.x
                this.seed.y = ogSeedPos.y
            }

            this.input.setDefaultCursor('default')
        })
    }

    checkItemCompletion() {
        if (this.registry.get('seedAdded')) {
            this.seed.x = 275
            this.seed.y = 465
            this.seed.disableInteractive()
        }
        if (this.registry.get('fertAdded')) {
            this.soil.setVisible(true)
            this.fertilizer.destroy()
        }
        if (this.registry.get('waterCollected')) {
            this.water.setAlpha(0.5)
            this.water.disableInteractive()
        }
        if (this.registry.get('sunCollected')) {
            this.sun.setAlpha(0.5)
            this.sun.disableInteractive()
        }
        if (this.registry.get('waterCollected') && this.registry.get('sunCollected') && this.registry.get('seedAdded') && this.registry.get('fertAdded')) {
            this.registry.set('plantStage', this.registry.get('plantStage') + 1)
            console.log(this.registry.get('plantStage'))
            this.growPlant()
        }            
    }

    growPlant() {
        const plantStage = this.registry.get('plantStage')
        if (plantStage === 1) {
            this.seed.setVisible(false)
            this.plantOne.setVisible(true)
            this.resetTaskStatus()
        } else if (plantStage === 2) {
            this.plantOne.setVisible(false)
            this.plantTwo.setVisible(true)
            this.resetTaskStatus()
        } else if (plantStage === 3) {
            this.bg.setAlpha(0.5)
            this.sun.disableInteractive()
            this.water.disableInteractive()
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'You Win!', {
                fontSize: '100px',
                fill: '#000000',
                fontStyle: 'bold'
            }).setOrigin(0.5, 0.5)
        }
    }

    resetTaskStatus() {
        this.registry.set('waterCollected', false)
        this.registry.set('sunCollected', false)

        this.water.setAlpha(1).setInteractive({ cursor: 'pointer' })
        this.sun.setAlpha(1).setInteractive({ cursor: 'pointer' })
    }
}