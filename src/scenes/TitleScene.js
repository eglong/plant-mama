import Phaser from 'phaser'
import startImg from '../assets/images/start-btn.png'
import titleImg from '../assets/images/title-bg.png'


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' })
    }

    preload() {
        // load start button
        this.load.image('background', titleImg)
        this.load.image('startButton', startImg)
    }

    create() {
        // add background image, centered
        this.add.image(300, 300, 'background')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height)

        // add start button
        const startButton = this.add.image(175, 385, 'startButton')
            .setInteractive() // make clickable
            .setScale(0.19)
        
        // add hover effect
        startButton.on('pointerover', () => {
            startButton.setTint(0x99ff99)
        })

        startButton.on('pointerout', () => {
            startButton.clearTint();
        });

        // Start the game on click
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}