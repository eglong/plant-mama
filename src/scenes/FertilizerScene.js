import Phaser from 'phaser';
import outsideImg from '../assets/images/leafImages/outside-bg.png'
import aliveFlowerImg from '../assets/images/leafImages/alive flower.png'
import basketImg from '../assets/images/leafImages/Basket.png'
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
        this.countLeaf = 0;  // Keep track of the number of leaves collected
        this.timer = 12;  // Timer set to 10 seconds
        this.timerEvent = null;  // Holds the timer event
        this.gameEnded = false;  // Flag to check if the game has ended
    }

    preload() {
        // Load images
        this.load.image('sunBackground', outsideImg);
        this.load.image('sunAliveFlower', aliveFlowerImg);
        this.load.image('basket', basketImg);
        this.load.image('sunLeaf1', Leaf1Img);
        this.load.image('sunLeaf2', Leaf2Img);
        this.load.image('sunLeaf3', Leaf3Img);
        this.load.image('sunLeaf4', Leaf4Img);
        this.load.image('sunLeaf5', Leaf5Img);
        this.load.image('sunLeaf6', Leaf6Img);
        this.load.image('sunLeaf7', Leaf7Img);
        this.load.image('sunLeaf8', Leaf8Img);
        this.load.image('sunLeaf9', Leaf9Img);
        this.load.image('sunLeaf10', Leaf10Img);
    }

    create() {
        // Add background image
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'sunBackground')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Create and store the basket image in a variable
        const basket = this.add.image(87, 512, 'basket')
            .setScale(1.000001);

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

                    // Check if the player has collected enough leaves
                    if (this.countLeaf >= 10 && this.timer == 0) {
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
            console.log("You have won the game ;)");
        } else {
            console.log("You have lost the game :(");
        }
    }
}