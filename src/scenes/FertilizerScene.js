import Phaser from 'phaser';

export default class FertScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FertScene' });
    }

    preload() {
        // Load images
        this.load.image('sunBackground', './images/backgrounds/outside-bg.png');
        this.load.image('sunAliveFlower', './images/plantPhases/alive-flower.png');
        this.load.image('basket', './images/basket.png');
        this.load.image('sunLeaf1', './images/leafImages/Leaf 1.png');
        this.load.image('sunLeaf2', './images/leafImages/Leaf 2.png');
        this.load.image('sunLeaf3', './images/leafImages/Leaf 3.png');
        this.load.image('sunLeaf4', './images/leafImages/Leaf 4.png');
        this.load.image('sunLeaf5', './images/leafImages/Leaf 5.png');
        this.load.image('sunLeaf6', './images/leafImages/Leaf 6.png');
        this.load.image('sunLeaf7', './images/leafImages/Leaf 7.png');
        this.load.image('sunLeaf8', './images/leafImages/Leaf 8.png');
        this.load.image('sunLeaf9', './images/leafImages/Leaf 9.png');
        this.load.image('sunLeaf10', './images/leafImages/Leaf 10.png');
    }

    create() {
        // reset state variables 
        this.countLeaf = 0;
        this.timer = 15;
        this.gameEnded = false;
        this.countToWin = 10;

        // Add background image
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'sunBackground')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Create and store the basket image in a variable
        const basket = this.add.image(87, 512, 'basket')
            .setScale(1.000001);

        // leaf counter
        this.leafCounterText = this.add.text(20, 20, `Leaves: 0`, {
            font: '32px Arial',
            fill: '#000000'
        });

        // Create a text object for the timer
        this.timerText = this.add.text(460, 20, `Time: ${this.timer}s`, {
            font: '32px Arial',
            fill: '#ffffff'
        });

        // Start the timer event
        this.timerEvent = this.time.addEvent({
            delay: 1000,  // 1 second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Add all the leaves to an array
        const leaves = [];
        for (let i = 0; i < 20; i++) {
            // Randomize the height between 25 and 125
            let randomY = Phaser.Math.Between(25, 125);
            let leaf = this.add.image(Phaser.Math.Between(0, this.scale.width), this.scale.height - randomY, `sunLeaf${Phaser.Math.Between(1, 10)}`).setScale(0.5);
            leaves.push(leaf);

            // Make the leaf interactive (draggable)
            leaf.setInteractive();

            // Enable drag for the leaf
            this.input.setDraggable(leaf);

            // Optional: add a drag event listener
            leaf.on('drag', (pointer, dragX, dragY) => {
                if (!this.gameEnded) {  // Prevent dragging when the game is over
                    leaf.x = dragX;
                    leaf.y = dragY;
                }
            });

            // Optional: add a drag start and drag end event for additional effects
            leaf.on('dragstart', () => {
                leaf.setAlpha(0.5); // Fade out the leaf slightly when dragging
            });

            leaf.on('dragend', () => {
                leaf.setAlpha(1); // Restore the leaf's opacity after dragging

                // Check if the leaf and basket overlap when the drag ends
                if (!this.gameEnded && this.checkOverlap(leaf, basket)) {
                    leaf.setVisible(false); // Hide the leaf when it overlaps with the basket
                    leaf.destroy(); // Remove the leaf from the scene
                    this.countLeaf++;  // Increase the count of collected leaves

                    // update leaf counter
                    this.leafCounterText.setText(`Leaves: ${this.countLeaf}`)

                    // Check if the player has collected enough leaves
                    if (this.countLeaf >= this.countToWin) {
                        this.gameOver(true); // Win if 10 leaves collected
                    }
                }
            });
        }
    }

    // Helper function to check if two sprites overlap
    checkOverlap(leaf, basket) {
        const leafBounds = leaf.getBounds();
        const basketBounds = basket.getBounds();
        
        return Phaser.Geom.Rectangle.Overlaps(leafBounds, basketBounds);
    }

    // Timer update function
    updateTimer() {
        if (this.timer > 0 && !this.gameEnded) {
            this.timer--;
            this.timerText.setText(`Time: ${this.timer}s`); // Update the displayed timer
        } else if (!this.gameEnded) {
            // If the timer reaches 0, game ends
            this.gameOver(false);
        }
    }

    // Game over function
    gameOver(win) {
        this.gameEnded = true;  // Set the flag to true to stop interactions

        this.timerEvent.remove();  // Stop the timer

        // Display win or lose message
        if (win) {
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'Fertilizer collected!', {
                fontSize: '30px',
                fill: '#000000',
                fontStyle: 'bold'
            }).setOrigin(0.5, 0.5)
            
            this.time.delayedCall(2000, () => { 
                this.registry.set('fertAdded', true)
                this.scene.start('GameScene') 
            }, [], this)

        } else {
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'You lost, try again later', {
                fontSize: '30px',
                fill: '#000000',
                fontStyle: 'bold'
            }).setOrigin(0.5, 0.5)

            this.time.delayedCall(2000, () => { 
                this.scene.start('GameScene') 
            }, [], this)
        }
    }
}