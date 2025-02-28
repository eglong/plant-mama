import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        // load images
        this.load.image('levelBackground', './images/backgrounds/level-bg.png')
        this.load.image('pot', './images/plant-pot.png')
        this.load.image('seed', './images/seed.png')
        this.load.image('watercan', './images/water-bucket.png')
        this.load.image('fertilizer', './images/fertilizer.png')
        this.load.image('plantOne', './images/plantPhases/plant-phase1.png')
        this.load.image('plantTwo', './images/plantPhases/plant-phase2.png')
        this.load.image('plantThree', './images/plantPhases/plant-phase3.png')
        this.load.image('flower', './images/plantPhases/alive-flower.png')
        this.load.image('sun', './images/sun.png')
        this.load.image('soil', './images/soil.png')
        this.load.image('closedCurtain', './images/closed-curtain.png')
        this.load.image('openCurtain', './images/open-curtain.png')
    }

    create() {
        // add background and images
        this.bg = this.add.image(0, 0, 'levelBackground').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height)
        this.closedCurtain = this.add.image(434, 267, 'closedCurtain').setOrigin(0.5, 0.5).setScale(0.90)
        this.openCurtain = this.add.image(436, 276, 'openCurtain').setOrigin(0.5, 0.5).setVisible(false).setScale(0.96)
        this.fertilizer = this.add.image(50, 200, 'fertilizer').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.water = this.add.image(50, 130, 'watercan').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.sun = this.add.image(50, 50, 'sun').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
        this.seed = this.add.image(50, 260, 'seed').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true })
        this.plantOne = this.add.image(271, 450, 'plantOne').setOrigin(0.5, 0.5).setVisible(false)
        this.plantTwo = this.add.image(271, 436, 'plantTwo').setOrigin(0.5, 0.5).setVisible(false).setScale(0.7)
        this.plantThree = this.add.image(268, 420, 'plantThree').setOrigin(0.5, 0.5).setVisible(false).setScale(0.35)
        this.flower = this.add.image(265, 430, 'flower').setOrigin(0.5, 0.5).setVisible(false).setScale(0.7)
        this.soil = this.add.image(270, 470, 'soil').setOrigin(0.5, 0.5).setVisible(false)
        this.pot = this.add.image(270, 500, 'pot').setOrigin(0.5, 0.5)
        const ogSeedPos = {
            x: this.seed.x,
            y: this.seed.y
        }
        const pottedSeedPos = {
            x: 270,
            y: 466
        }

        this.add.text(340, 55, "Drag and drop the seed to plant.\nCollect fertilizer.\n\nP.S. Plants need plenty of sun\nand water to grow ;)", {
            fontSize: '18px',
            fill: '#000000',
        }).setOrigin(0.5, 0.5)

        // check if items have been added
        this.checkItemCompletion()

        this.fertilizer.on('pointerdown', () => {
            // this.registry.set('fertAdded', true)
            // this.checkItemCompletion()
            this.scene.start('FertScene')
        })
        this.water.on('pointerdown', () => {
            // this.registry.set('waterCollected', true)
            // this.checkItemCompletion()
            this.scene.start('WaterScene')
        })
        // TODO: add curtain opening and then closing after the plant grows and sun resets
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
                this.seed.x = 270
                this.seed.y = 464
                this.registry.set('seedAdded', true)
                this.seed.disableInteractive()
                this.checkItemCompletion()
            } else {
                this.seed.x = ogSeedPos.x
                this.seed.y = ogSeedPos.y
            }

            this.input.setDefaultCursor('default')
        })
    }

    checkItemCompletion() {
        // display current plant stage
        this.displayPlantStage()

        if (this.registry.get('seedAdded')) {
            this.seed.x = 270
            this.seed.y = 464
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
            // open curtain
            this.closedCurtain.setVisible(false)
            this.openCurtain.setVisible(true)
        }
        if (this.registry.get('waterCollected') && this.registry.get('sunCollected') && this.registry.get('seedAdded') && this.registry.get('fertAdded')) {
            this.registry.set('plantStage', this.registry.get('plantStage') + 1)

            // display new plant stage
            this.time.delayedCall(1000, () => { 
                this.displayPlantStage()
                if (this.registry.get('plantStage') !== 4) {
                    this.resetTaskStatus()
                }
            }, [], this)
        }
    }

    displayPlantStage() {
        const plantStage = this.registry.get('plantStage')
        if (plantStage === 1) {
            this.seed.setVisible(false)
            this.plantOne.setVisible(true)
        } else if (plantStage === 2) {
            this.seed.setVisible(false)
            this.plantOne.setVisible(false)
            this.plantTwo.setVisible(true)
        } else if (plantStage === 3) {
            this.seed.setVisible(false)
            this.plantOne.setVisible(false)
            this.plantTwo.setVisible(false)
            this.plantThree.setVisible(true)
        } else if (plantStage === 4) {
            this.seed.setVisible(false)
            this.plantOne.setVisible(false)
            this.plantTwo.setVisible(false)
            this.plantThree.setVisible(false)
            this.flower.setVisible(true)
            this.displayWin()
        }
    }

    resetTaskStatus() {
        this.registry.set('waterCollected', false)
        this.registry.set('sunCollected', false)

        this.water.setAlpha(1).setInteractive({ cursor: 'pointer' })
        this.sun.setAlpha(1).setInteractive({ cursor: 'pointer' })

        // close curtain
        this.openCurtain.setVisible(false)
        this.closedCurtain.setVisible(true)
    }

    displayWin() {
        this.water.setAlpha(0.5).disableInteractive()
        this.sun.setAlpha(0.5).disableInteractive()
        this.time.delayedCall(1000, () => { 
            this.bg.setAlpha(0.5)
            this.openCurtain.setAlpha(0.5)
            this.add.text(this.scale.width / 2, 165, 'You Win!', {
                fontSize: '100px',
                fill: '#000000',
                fontStyle: 'bold',
                stroke: '#FFFFFF',
                strokeThickness: 5
            }).setOrigin(0.5, 0.5)

            const restartButton = this.add.text(this.scale.width / 2, 250, 'Restart', {
                fontSize: '30px',
                fill: '#000000',
                backgroundColor: '#FF8E0A',
                padding: { x: 10, y: 10 }
            }).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' })
            
            restartButton.on('pointerdown', () => {
                this.scene.start('TitleScene')
            })
        }, [], this)
    }
}