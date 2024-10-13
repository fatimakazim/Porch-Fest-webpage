let NUM_OF_PARTICLES = 11;
let particles = [];

function setup() {
  // Adjust the canvas size to the screen width and height
  createCanvas(windowWidth, windowHeight);

  // Generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), 0);
  }
}

function draw() {
  // Set the background color to dark blue
  background('#19226D');

  // Update and display particles (now autumn leaves)
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

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

// Automatically resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
