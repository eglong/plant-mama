import Phaser from 'phaser'
import startImg from '../assets/images/start-btn.png'
import titleBgImg from '../assets/images/title-bg.png'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' })
    }

    preload() {
        // load iamges
        this.load.image('titleBackground', titleBgImg)
        this.load.image('startButton', startImg)
    }

    create() {
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
            this.scene.start('SunScene');
        });
    }
}