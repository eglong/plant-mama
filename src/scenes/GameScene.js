import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.add.text(300, 300, 'Game Started!', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
        }).setOrigin(0.5);
    }
}