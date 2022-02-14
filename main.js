const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// to make the canvas fit the whole screen

canvas.width = window.innerWidth // it would work also without the window bcs thats default
canvas.height = window.innerHeight

const gravity = 0.3

class Player {
  constructor(){
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30;
    this.height = 30;
  }
  draw(){
    ctx.fillStyle = "red"
    ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
  }

  update(){
    this.draw()
    this.position.y += this.velocity.y // changing the position on the Y axis
    this.position.x += this.velocity.x
    if(this.position.y + this.height + this.velocity.y <= canvas.height){
      this.velocity.y += gravity // only if the player doesnt fall lower than the bottom of the screen/canvas
    } else {
      this.velocity.y = 0 // if the player was to fall below the canvas it stops
    }
  }
}

// obstacles

class Obstacle {
  constructor(){
    this.width = 100;
    this.height = 100;
    this.position = {
      x: 200,
      y: window.innerHeight - this.width
    }
  };
  draw(){
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x,this.position.y,this.width, this.height)
    console.log("drawing obstacle");
  };
}

// create the player
const player = new Player()

// create obtacle
const obstacle = new Obstacle()
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
function animate(){
  requestAnimationFrame(animate) // it will be running the function over and over
  ctx.clearRect(0,0, canvas.width, canvas.height) // so it doesnt drag but clears before
  obstacle.draw()
  player.update()
  if(keys.right.pressed){
    player.velocity.x = 5
  }
  else if (keys.left.pressed){
    player.velocity.x = -5
  } else player.velocity.x = 0;
}

animate()

// event listeners

window.addEventListener("keydown", (e)=>{
  if (e.key == "ArrowUp"){
    player.velocity.y -= 10
    console.log("jump");
  }
  if (e.key == "ArrowRight") {
    console.log("aheeead");
    keys.right.pressed = true;
  }
  if (e.key == "ArrowLeft") {
    console.log("back");
    keys.left.pressed = true;
  }
})

window.addEventListener("keyup", (e) => {
  if (e.key == "ArrowUp") {
    player.velocity.y -= 10
    console.log("jump");
  }
  if (e.key == "ArrowRight") {
    console.log("aheeead");
    keys.right.pressed = false
  }
  if (e.key == "ArrowLeft") {
    console.log("back");
    keys.left.pressed = false
  }
})
