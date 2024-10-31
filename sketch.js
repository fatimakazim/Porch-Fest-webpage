let NUM_OF_PARTICLES = 11;
let particles = [];
let buttons = [];
const BUTTON_SIZE = 90;
const BUTTON_VERTICAL_SPACING = 5;
const BUTTON_SPACING = 120;

const BUTTON_IMAGES = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png'
];
const BUTTON_LINKS = [
  'https://link1.com',
  'https://www.google.com/maps/d/viewer?mid=1DQCebtayCO6PHkKJgCTuzFEA6v-FsdU&femb=1&ll=38.92153793691423%2C-77.04543470916516&z=17',
  'https://link3.com',
  'https://link4.com',
  'https://link5.com',
  'https://link6.com'
];

let backgroundImage;

function preload() {
  backgroundImage = loadImage('background-image.jpg');
}

function setup() {
  let canvasHeight = max(windowHeight, 2000); // Set a larger canvas height to enable scrolling
  createCanvas(windowWidth, canvasHeight);

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), 0);
  }

  const buttonStartY = height / 4; // Change this value to move buttons higher

  for (let i = 0; i < BUTTON_IMAGES.length; i++) {
    let x = width / 2 + (i % 2) * (BUTTON_SIZE + BUTTON_SPACING) - (BUTTON_SIZE + BUTTON_SPACING) / 2;
    let y = buttonStartY + Math.floor(i / 2) * (BUTTON_SIZE + BUTTON_SPACING) + BUTTON_VERTICAL_SPACING;
    buttons.push(new ImageButton(x, y, BUTTON_SIZE, BUTTON_IMAGES[i], BUTTON_LINKS[i]));
  }
}

function draw() {
  image(backgroundImage, 0, 0, width, height); 

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  for (let button of buttons) {
    button.display();
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = random(2, 5);
    this.size = random(20, 40);
    this.rotation = random(-PI / 6, PI / 6);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill('#F7A43F');
    noStroke(); // Remove outline from particles
    beginShape();
    vertex(0, -this.size * 0.5);
    bezierVertex(this.size * 0.4, -this.size * 0.3, this.size * 0.4, this.size * 0.3, 0, this.size * 0.5);
    bezierVertex(-this.size * 0.4, this.size * 0.3, -this.size * 0.4, -this.size * 0.3, 0, -this.size * 0.5);
    endShape(CLOSE);
    line(0, -this.size * 0.5, 0, this.size * 0.5);
    pop();
  }
}

class ImageButton {
  constructor(x, y, size, imgPath, link) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = loadImage(imgPath);
    this.link = link;
  }

  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size);
    noFill();
    noStroke(); // Remove red outline from buttons
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }

  isMouseOver() {
    return mouseX > this.x - this.size / 2 && mouseX < this.x + this.size / 2 &&
           mouseY > this.y - this.size / 2 && mouseY < this.y + this.size / 2;
  }

  openLink() {
    window.open(this.link, '_self'); // Open link in the same window
  }
}

function mousePressed() {
  for (let button of buttons) {
    if (button.isMouseOver()) {
      button.openLink();
    }
  }
}

function touchStarted() {
  for (let button of buttons) {
    if (button.isMouseOver()) {
      button.openLink();
    }
  }
  return false; // Prevents any default touch behavior
}

function windowResized() {
  resizeCanvas(windowWidth, max(windowHeight, 2000)); // Ensure resizing keeps large canvas height
}

