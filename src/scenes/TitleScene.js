import Phaser from 'phaser'
import startImg from '../assets/images/start-btn.png'
import titleImg from '../assets/images/title-bg.png'


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' })
    }

    preload() {
        // load iamges
        this.load.image('background', titleImg)
        this.load.image('startButton', startImg)
    }

    create() {
        // add background image, centered
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height)

        // add start button
        const startButton = this.add.image(185, 450, 'startButton')
            .setScale(.65)
            .setInteractive({
                userHandCursor: true,
                pixelPerfect: true
            }) // make clickable
        
        // add hover effect
        startButton.on('pointerover', () => {
            startButton.setTint(0xffb70a)
        })

        startButton.on('pointerout', () => {
            startButton.clearTint();
        });

        // start the game on click
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}