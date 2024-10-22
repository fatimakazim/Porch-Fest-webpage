let NUM_OF_PARTICLES = 11;
let particles = [];
let buttons = [];
const BUTTON_SIZE = 90;
const BUTTON_VERTICAL_SPACING = 0;
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
  'https://link2.com',
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
  let canvasHeight = max(windowHeight, 1500); // Ensure canvas is larger than screen for scrollable content
  createCanvas(windowWidth, canvasHeight);

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), 0);
  }
    // Adjust the BUTTON_VERTICAL_SPACING to a smaller value
    const reducedVerticalSpacing = 5; // Reduced vertical space between image and buttons

  for (let i = 0; i < BUTTON_IMAGES.length; i++) {
    let x = width / 2 + (i % 2) * (BUTTON_SIZE + BUTTON_SPACING) - (BUTTON_SIZE + BUTTON_SPACING) / 2;
    let y = height / 2 + Math.floor(i / 2) * (BUTTON_SIZE + BUTTON_SPACING) + BUTTON_VERTICAL_SPACING;
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
    stroke(0);
    beginShape();
    vertex(0, -this.size * 0.5);
    bezierVertex(this.size * 0.4, -this.size * 0.3, this.size * 0.4, this.size * 0.3, 0, this.size * 0.5);
    bezierVertex(-this.size * 0.4, this.size * 0.3, -this.size * 0.4, -this.size * 0.3, 0, -this.size * 0.5);
    endShape(CLOSE);
    stroke(100);
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
    pop();
  }

  isMouseOver() {
    return mouseX > this.x - this.size / 2 && mouseX < this.x + this.size / 2 &&
           mouseY > this.y - this.size / 2 && mouseY < this.y + this.size / 2;
  }
}

function mousePressed() {
  for (let button of buttons) {
    if (button.isMouseOver()) {
      window.open(button.link, '_blank');
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, max(windowHeight, 1500));
}

