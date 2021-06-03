"use strict";

class Render {
  constructor(element) {
    this.element = element;
    this.setup();
    this.getColor();
  }
  getColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 8; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  setup() {
    console.log(this);
    let box = document.createElement("div");
    let game = document.getElementById("game");
    const h1 = document.querySelector(".hOne");
    h1.style.fontSize = "30px";
    setInterval(() => {
      h1.style.color = this.getColor();
      game.style.background = this.getColor();
    }, 2000);
    box.style.position = "absolute";
    box.style.top = "1px";
    box.style.left = "80px";
    box.style.width = "35px";
    box.style.height = "35px";
    box.style.border = "2px solid black";
    setInterval(() => {
      box.style.backgroundColor = this.getColor();
      game.style.background = this.getColor();
    }, 2000);

    box.style.borderRadius = "20px";
    this.element.appendChild(box);
    this.box = box;
  }
  renderOne(position) {
    this.box.style.top = position + "px";
  }
}
// new Class Box
class Box {
  constructor() {
    this.position = 0;
    this.speed = 0;
  }
  loopGame() {
    this.speed++;
    this.position = this.position + this.speed;
  }
  moveup() {
    this.speed = -20;
  }
}
// New Class
class Game {
  constructor(element) {
    this.render = new Render(element);
    this.box = new Box();
    this.element = element;
    this.isRunning = true;
    this.setup();
    this.btnStart();
    this.getColor();
    // this.getCounter();
  }
  setup() {
    this.element.addEventListener(
      "click",
      () => {
        this.box.moveup();
      },
      false
    );
  }
  getColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  btnStart() {
    let btn = document.querySelector(".btn");
    setInterval(() => {
      btn.style.backgroundColor = this.getColor();
    }, 1000);

    btn.style.borderRadius = "20px";
    btn.style.outline = "none";
    btn.style.border = "none";
    btn.style.border = "1px solid black";
    btn.style.padding = "10px";
    btn.addEventListener(
      "click",
      () => {
        let counter = 0;
        setTimeout(() => {
          let timer = setInterval(() => {
            counter = counter + 1;
            this.box.loopGame();
            if (this.box.position < 0) {
              console.log(counter);

              this.isRunning = false;
              clearInterval(timer);
              alert(" لقد خسرت " + " مجموع  نقاطك " + " " + counter);
            }
            if (this.box.position + 20 > this.element.clientHeight) {
              this.isRunning = false;
              clearInterval(timer);
              alert(" لقد خسرت " + " مجموع  نقاطك " + " " + counter);
            }
            if (this.isRunning == true) {
              this.render.renderOne(this.box.position);
              let spn = document.querySelector(".spn");
              setInterval(() => {
                spn.style.color = this.getColor();
              }, 400);
             
              spn.innerHTML = `Your Score is ${counter}`;
            }
          }, 30);
        }, 3000);
      },
      false
    );
  }
  // getCounter() {
  //   let spn = document.querySelector(".spn");
  //   spn.addEventListener("click", () => {
  //       console.log(spn);
  //       let counter = 0
  //       counter ++;
  //       spn.innerHTML = counter;

  //   });
  // }
  // start() {

  // }
}
let game = new Game(document.getElementById("game"));
// game.start();
