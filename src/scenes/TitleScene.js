import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' })
    }

    preload() {
        // load iamges
        this.load.image('titleBackground', '/images/title-bg.png')
        this.load.image('startButton', '/images/start-btn.png')
    }

    create() {
        // initialize level and completion status
        this.registry.set('seedAdded', false)
        this.registry.set('fertAdded', false)
        this.registry.set('waterCollected', false)
        this.registry.set('sunCollected', false)
        this.registry.set('plantStage', 0)

        // add background image, centered
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'titleBackground').setOrigin(0.5).setDisplaySize(this.scale.width, this.scale.height)

        // add start button
        const startButton = this.add.image(185, 450, 'startButton').setScale(.65).setInteractive({ cursor: 'pointer', pixelPerfect: true })
        
        // add hover effect
        startButton.on('pointerover', () => {
            startButton.setTint(0xffb70a)
        })

        startButton.on('pointerout', () => {
            startButton.clearTint();
        });

        // start the game on click
        startButton.on('pointerdown', () => {
            this.scene.start('LevelScene');
        });
    }
}