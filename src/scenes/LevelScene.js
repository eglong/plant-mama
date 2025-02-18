import Phaser from 'phaser'
import levelBgImg from '../assets/images/level-bg.png'
import potImg from '../assets/images/plant-pot.png'
import seedImg from '../assets/images/seed.png'
import waterImg from '../assets/images/water-bucket.png'
import fertilizerImg from '../assets/images/fertilizer.png'
import plantOneImg from '../assets/images/plant-phase1.png'
import sunImg from '../assets/images/sun.png'

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
        this.load.image('sun', sunImg)
    }

    create() {
        // add background
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelBackground').setOrigin(0.5).setDisplaySize(this.scale.width, this.scale.height)

        const fertilizerButton = this.add.image(50, 200, 'fertilizer').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true })
        this.pot = this.add.image(275, 500, 'pot').setOrigin(0.5, 0.5)
        
        // array of draggable items
        const items = [
            this.sun = this.add.image(50, 50, 'sun').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true }),
            this.water = this.add.image(50, 130, 'watercan').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true }),
            this.seed = this.add.image(50, 260, 'seed').setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer', draggable: true })
        ]

        fertilizerButton.on('pointerdown', () => {
            this.scene.start('FertScene')
        })

        // store og positions
        const ogPositions = items.map(item => ({ x: item.x, y: item.y }))

        // enable dragging for all
        items.forEach(item => this.input.setDraggable(item))

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setAlpha(0.5)
        })

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX,
            gameObject.y = dragY
        })

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setAlpha(1)
            const index = items.indexOf(gameObject)
            gameObject.x = ogPositions[index].x
            gameObject.y = ogPositions[index].y
        })
    }
}