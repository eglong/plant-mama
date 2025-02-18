import Phaser from 'phaser';
import outsideImg from '../assets/images/leafImages/outside-bg.png'
import aliveFlowerImg from '../assets/images/leafImages/alive flower.png'
import Leaf1Img from '../assets/images/leafImages/Leaf 1.png'
import Leaf2Img from '../assets/images/leafImages/Leaf 2.png'
import Leaf3Img from '../assets/images/leafImages/Leaf 3.png'
import Leaf4Img from '../assets/images/leafImages/Leaf 4.png'
import Leaf5Img from '../assets/images/leafImages/Leaf 5.png'
import Leaf6Img from '../assets/images/leafImages/Leaf 6.png'
import Leaf7Img from '../assets/images/leafImages/Leaf 7.png'
import Leaf8Img from '../assets/images/leafImages/Leaf 8.png'
import Leaf9Img from '../assets/images/leafImages/Leaf 9.png'
import Leaf10Img from '../assets/images/leafImages/Leaf 10.png'

export default class SunScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FertScene' });
    }

    preload() {
        // load images
        this.load.image('sunBackground', outsideImg)
        this.load.image('sunAliveFlower', aliveFlowerImg)
        this.load.image('sunLeaf1', Leaf1Img)
        this.load.image('sunLeaf2', Leaf2Img)
        this.load.image('sunLeaf3', Leaf3Img)
        this.load.image('sunLeaf4', Leaf4Img)
        this.load.image('sunLeaf5', Leaf5Img)
        this.load.image('sunLeaf6', Leaf6Img)
        this.load.image('sunLeaf7', Leaf7Img)
        this.load.image('sunLeaf8', Leaf8Img)
        this.load.image('sunLeaf9', Leaf9Img)
        this.load.image('sunLeaf10', Leaf10Img)
    }

    create() {
        // add background image, centered
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'sunBackground')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.add.image(330, 430, 'sunAliveFlower')
            .setScale(0.5);

        // Add all the leaves to an array
        const leaves = [
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf2').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf3').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf4').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf5').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf6').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf7').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf8').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf9').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'sunLeaf10').setScale(0.5)
        ];
    
        // Variables for the falling leaves
        const fallDuration = 7000;
        const intervalTime = 2000;
        const totalLeaves = 10;
        let leafCount = 0;
    
        // Function to make a leaf fall
        const makeLeafFall = () => {
            if (leafCount >= totalLeaves) return; // Stop after 10 leaves
    
            const randomIndex = Phaser.Math.Between(0, 9);
            const randomHeight = Phaser.Math.Between(25, 75);
            const selectedLeaf = leaves[randomIndex];
    
            if (selectedLeaf) {
                this.tweens.add({
                    targets: selectedLeaf,
                    y: this.scale.height - randomHeight,
                    duration: fallDuration,
                    ease: 'Power1',
                });
            }
    
            leafCount++;
        };
    
        // Trigger leaves to fall every 2 seconds
        this.time.addEvent({
            delay: intervalTime,
            callback: makeLeafFall,
            callbackScope: this,
            loop: true,
            repeat: totalLeaves - 1
        });

        this.time.delayedCall(100, () => {
            this.registry.set('fertAdded', true) 
            this.scene.start('LevelScene')
        }, [], this)
        
    }
}