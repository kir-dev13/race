"use strict";

const score = document.querySelector(".score"),
  gameArea = document.querySelector(".gameArea"),
  start = document.querySelector(".start"),
  car = document.createElement("div");

car.classList.add("car");

const keys = {
  // ArrowUp: false,
  // ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function getQuantityElements(heightElement) {
  return Math.floor(gameArea.offsetHeight / heightElement);
}
console.log(getQuantityElements(50));
function startGame() {
  start.classList.add("hide");

  for (let i = 0; i < getQuantityElements(50); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.y = i * 100;
    line.style.top = line.y + "px";
    // console.log(line.y);
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(150 * setting.traffic); i++) {
    let imageEnemy = getRandomInt(1, 3);
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.classList.add("car");
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = getRandomInt(gameArea.offsetWidth - 50, 50) + "px";
    // console.log(enemy.style.left);
    // console.dir(enemy);

    enemy.style.background = `transparent url('./image/enemy${imageEnemy}.png') center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  setting.start = true; //* ! Setting.start = true !
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function moveRoad() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (line) {
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y >= gameArea.offsetHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    let imageEnemy = getRandomInt(1, 3);
    item.y += setting.speed / 2;
    // item.y += 1 / setting.speed;
    console.log("item.y: ", item.y);
    item.style.top = item.y + "px";
    if (item.y >= gameArea.offsetHeight) {
      item.y = -150 * setting.traffic;
      item.style.left =
        getRandomInt(
          gameArea.offsetWidth - car.offsetWidth,
          car.offsetWidth + 5
        ) + "px";
      // console.log(item.style.left);
      item.style.background = `transparent url('./image/enemy${imageEnemy}.png') center / cover no-repeat`;
    }
  });
}

function playGame() {
  moveRoad();
  moveEnemy();
  if (setting.start) {
    if (keys.ArrowLeft && setting.x > car.offsetWidth / 2) {
      setting.x -= setting.speed;
    }

    if (
      keys.ArrowRight &&
      setting.x < gameArea.offsetWidth - car.offsetWidth / 2
    ) {
      setting.x += setting.speed;
    }

    // if (keys.ArrowUp && setting.y > 0) {
    //   setting.y = setting.y - 1;
    // }
    // if (
    //   keys.ArrowDown &&
    //   setting.y < gameArea.offsetHeight - car.offsetHeight - 2
    // ) {
    //   setting.y += setting.speed;
    // }
  }

  car.style.left = setting.x + "px";
  car.style.top = setting.y + "px";
  requestAnimationFrame(playGame);
}

function startRun(event) {
  event.preventDefault();
  // if (keys.hasOwnProperty(event.key)) {
  //   keys[event.key] = true;
  // }
  if (event.key in keys) {
    keys[event.key] = true;
  } else
    switch (event.keyCode) {
      case 38:
        if (event.repeat) {
          break;
        }
        setting.speed += 2;
        break;
      case 40:
        if (event.repeat) {
          break;
        }
        setting.speed -= 1;
        break;
    }
  // } else if (event.keyCode == "38") {
  //   if (event.repeat) {
  //     return;
  //   }
  //   setting.speed += 2;
  // } else if (event.keyCode == "40") {
  //   if (event.repeat) {
  //     return;
  //   }
  //   setting.speed -= 2;
  //   return;
  // }
}

function stopRun(event) {
  event.preventDefault();
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  } else if (event.keyCode == "38") {
    setting.speed -= 2;
    return;
  } else if (event.keyCode == "40") {
    setting.speed += 1;
    return;
  }
}

start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun, false);
document.addEventListener("keyup", stopRun, false);
