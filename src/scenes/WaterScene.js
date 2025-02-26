import Phaser from 'phaser';

export default class WaterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WaterScene' });
    }

    preload() {
        // load images
        this.load.image('WaterBackground', '/images/outside-bg.png')
        this.load.image('waterBucket', '/images/water-bucket.png')
        this.load.image('sunAliveFlower', '/images/alive-flower.png')
        this.load.image('waterWater1', '/images/water.png')
    }

    create() {
        // add background image, centered
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'WaterBackground')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.add.image(330, 460, 'sunAliveFlower')
            .setScale(0.5);
            
        const items = [this.watercan = this.add.image(120, 500, 'waterBucket').setOrigin(0.5, 0.5).setScale(1.25).setInteractive({ cursor: 'pointer', draggable: true })]
        const ogPositions = items.map(item => ({ x: item.x, y: item.y }))

        // enable dragging for all
        items.forEach(item => this.input.setDraggable(item))

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setAlpha(0.75)
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
        


        // Add all the leaves to an array
        const waterDroplets = [
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5),
            this.add.image(Phaser.Math.Between(0, this.scale.width), -50, 'waterWater1').setScale(0.5)
        ];
    
        // Variables for the falling leaves
        const fallDuration = 4000;
        const intervalTime = 500;
        const countToWin = 12;
        const totalWater = 20;
        let waterCount = 0;
        // Function to make a leaf fall
        const makeWaterFall = () => {
            if (waterCount >= totalWater) return; // Stop after 10 leaves
            const selectedWater = waterDroplets[waterCount];
    
            if (selectedWater) {
                this.tweens.add({
                    targets: selectedWater,
                    y: this.scale.height + 100,
                    duration: fallDuration,
                    ease: 'Power1',
                });
            }
            waterCount++;
        };
    
        // Trigger leaves to fall every 2 seconds
        this.time.addEvent({
            delay: intervalTime,
            callback: makeWaterFall,
            callbackScope: this,
            loop: true,
            repeat: totalWater - 1
        });
        let countNumCollected = 0;

        // water counter
        this.waterCounterText = this.add.text(20, 20, `Droplets: 0`, {
            font: '32px Arial',
            fill: '#000000'
        });

        // Check for collision between the water can and droplets at the same position
        this.time.addEvent({
            delay: 100, // Check every 100ms
            callback: () => {
                waterDroplets.forEach(droplet => {
                    if (droplet.active) {
                        // Calculate the distance between the water can and the droplet
                        const distance = Phaser.Math.Distance.Between(this.watercan.x, this.watercan.y, droplet.x, droplet.y);

                        // If they are at the same position (distance is small), remove the droplet
                        if (distance < 50) { // Adjust the threshold for the collision (50px)
                            droplet.setAlpha(0); // Make the droplet disappear
                            droplet.setActive(false);
                            droplet.setVisible(false);
                            countNumCollected++;

                            // update water counter
                            this.waterCounterText.setText(`Droplets: ${countNumCollected}`)
                        }
                    }
                });
                if (countNumCollected >= countToWin) {
                    this.add.text(this.scale.width / 2, this.scale.height / 2, 'Water collected!', {
                        fontSize: '30px',
                        fill: '#000000',
                        fontStyle: 'bold'
                    }).setOrigin(0.5, 0.5)
                    
                    this.time.delayedCall(2000, () => { 
                        this.registry.set('waterCollected', true)
                        this.scene.start('LevelScene') 
                    }, [], this)
                    
                } else if (countNumCollected < countToWin && waterCount === totalWater) {
                    this.add.text(this.scale.width / 2, this.scale.height / 2, 'You lost, try again later', {
                        fontSize: '30px',
                        fill: '#000000',
                        fontStyle: 'bold'
                    }).setOrigin(0.5, 0.5)
        
                    this.time.delayedCall(2000, () => { 
                        this.scene.start('LevelScene') 
                    }, [], this)
                }
            },
            callbackScope: this,
            loop: true
        });
    }
}