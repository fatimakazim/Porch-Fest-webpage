let NUM_OF_PARTICLES = 11;
let particles = [];
let buttons = [];
const BUTTON_SIZE = 90; // Size of the buttons
const BUTTON_SPACING = 190; // Spacing between buttons
const BUTTON_VERTICAL_SPACING = 90; // Space between centered image and buttons
const BUTTON_IMAGES = [
  'image1.png', // Replace with your image URLs
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png'
];
const BUTTON_LINKS = [
  'https://link1.com', // Replace with your desired links
  'https://link2.com',
  'https://link3.com',
  'https://link4.com',
  'https://link5.com',
  'https://link6.com'
];

let backgroundImage; // Variable to hold the background image

function preload() {
  // Load the background image
  backgroundImage = loadImage('background-image.jpg'); // Replace with your background image URL
}

function setup() {
  // Adjust the canvas size to the screen width and height
  createCanvas(windowWidth, windowHeight);

  // Generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), 0);
  }

  // Create buttons with images positioned to fit together
  for (let i = 0; i < BUTTON_IMAGES.length; i++) {
    let x = width / 2 + (i % 2) * (BUTTON_SIZE + BUTTON_SPACING) - (BUTTON_SIZE + BUTTON_SPACING) / 2; // Adjust x position with spacing
    let y = height / 2 + Math.floor(i / 2) * (BUTTON_SIZE + BUTTON_SPACING) + BUTTON_VERTICAL_SPACING; // Adjust y position with vertical spacing
    buttons.push(new ImageButton(x, y, BUTTON_SIZE, BUTTON_IMAGES[i], BUTTON_LINKS[i]));
  }
}

function draw() {
  // Set the background to the loaded image
  image(backgroundImage, 0, 0, width, height);

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // Display buttons
  for (let button of buttons) {
    button.display();
  }
}

// Particle class definition
class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = random(2, 5);
    this.angle = random(TWO_PI);
    this.size = random(20, 40); // Larger sizes for leaves
    this.rotation = random(-PI / 6, PI / 6); // Small random rotation for variety
  }

  update() {
    this.y += this.speed;

    // Reset the particle to the top when it reaches the bottom
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill('#F7A43F'); // Autumn leaf color (yellow-orange)
    stroke(0); // Dark outline for contrast

    // Draw a rounder, leaf-like shape using bezier curves
    beginShape();
    vertex(0, -this.size * 0.5); // Top point of the leaf
    bezierVertex(this.size * 0.4, -this.size * 0.3, this.size * 0.4, this.size * 0.3, 0, this.size * 0.5); // Right side curve
    bezierVertex(-this.size * 0.4, this.size * 0.3, -this.size * 0.4, -this.size * 0.3, 0, -this.size * 0.5); // Left side curve
    endShape(CLOSE);

    // Optional: draw a central vein for the leaf
    stroke(100);
    line(0, -this.size * 0.5, 0, this.size * 0.5);

    pop();
  }
}

// ImageButton class definition with clickable links
class ImageButton {
  constructor(x, y, size, imgPath, link) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = loadImage(imgPath); // Load the image
    this.link = link; // Store the link
  }

  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size); // Draw the image as a button
    pop();
  }

  // Check if the button is clicked
  isMouseOver() {
    return mouseX > this.x - this.size / 2 && mouseX < this.x + this.size / 2 &&
           mouseY > this.y - this.size / 2 && mouseY < this.y + this.size / 2;
  }
}

// Handle mouse clicks
function mousePressed() {
  for (let button of buttons) {
    if (button.isMouseOver()) {
      window.open(button.link, '_blank'); // Open the link in a new tab
    }
  }
}

// Automatically resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

