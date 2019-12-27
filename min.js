let aircraft = document.querySelector(".aircraft");
//飞机
let img = document.querySelector(".img");
//子弹
let bullets = document.querySelectorAll(".bullet");
//小敌机
let enemies = document.querySelectorAll(".enemy");
//大敌机
let buses = document.querySelectorAll(".big");
//中形机
let middles = document.querySelectorAll(".middle");
//炸弹
let bombs = document.querySelectorAll(".bomb");
//道具加子弹
let bullet2s = document.querySelectorAll(".bullet2");
//找到所有的敌机
let allEnemies = document.querySelectorAll(".allEnemies");
//找到所有的道具
let props = document.querySelectorAll(".props");
//拿到所有的左侧蓝色子弹
let leftBullets = document.querySelectorAll(".leftBullet");
//拿到所有的右侧蓝色子弹
let rightBullets = document.querySelectorAll(".rightBullet");
//拿到所有的函数子弹
let blueBullets = document.querySelectorAll(".blueBullet");
//拿到所有span
let enemys = document.querySelectorAll(".enemy");
//随机敌人掉落
function random() {
  return _.random(10, 1380);
}
//随机敌人掉落
function random1() {
  return _.random(10, 20);
}
//随机敌人速度
function randomTime() {
  return _.random(100, 200);
}
//随机初始位置top
function randomInitialPosition1() {
  return _.random(-80, -60);
}
//随机大飞机初始位置top
function randomInitialPosition11() {
  return _.random(-500, -100);
}
//随机初始位置left
function randomInitialPosition2() {
  return _.random(10, 1380);
}
//随机大飞机初始位置top
function randomInitialPosition3() {
  return _.random(-90, -100);;
}
//遍历所有敌机并修改初始位置
for (let enemy of enemies) {
  enemy.style.left = randomInitialPosition2() + "px";
  enemy.style.top = randomInitialPosition1() + "px";
}
//遍历所有大飞机并修改初始位置
for (let big of buses) {
  big.style.left = randomInitialPosition2() + "px";
  big.style.top = randomInitialPosition3() + "px";
}
//遍历所有的中型机并修改初始位置
for (let middle of middles) {
  middle.style.left = randomInitialPosition2() + "px";
  middle.style.top = randomInitialPosition3() + "px";
}
//遍历所有的炸弹并修改初始位置
for (let bomb of bombs) {
  bomb.style.left = randomInitialPosition2() + "px";
  bomb.style.top = randomInitialPosition3() + "px";
}
//遍历所有的道具并修改初始位置
for (let bullet2 of bullet2s) {
  bullet2.style.left = randomInitialPosition2() + "px";
  bullet2.style.top = randomInitialPosition3() + "px";
}
img.addEventListener("mousedown", event => {
  // img.remove('mousedown')
  let shiftX = event.clientX - img.offsetLeft;
  let shiftY = event.clientY - img.offsetTop;

  afterClicking(event);
  document.addEventListener("mousemove", afterClicking);
  document.addEventListener("mouseup", liftTheMouse);

  function afterClicking(event) {
    img.style.left = event.pageX - shiftX + "px";
    img.style.top = event.pageY - shiftY + "px";
    for (let bullet2 of bullet2s) {
      //找子弹
      let findBulletTimer = setInterval(findBullet, 100);
      let a = bullet2;
      if (judgeIntersect(a, img)) {
        //找左侧蓝色子弹
        let findBulletTimer11 = setInterval(findBullet11, 100);
        //左侧蓝色子弹开火
        let bulletFlyTimer11 = setInterval(bulletFlay11, 10);
        function bulletFlay11() {
          for (let bullet of leftBullets) {
            if (bullet.offsetTop > -20) {
              bullet.style.top = bullet.offsetTop - 20 + "px";
            }
          }

          //找到敌机和子弹位置并判断
          for (let enemy of allEnemies) {
            for (let leftBullet of leftBullets) {
              if (judgeIntersect(enemy, leftBullet)) {
                leftBullet.style.top = randomInitialPosition11() + "px";
                enemy.style.top = randomInitialPosition11() + "px";
              }
            }
          }
        }
        //找右侧蓝色子弹
        let findBulletTimer12 = setInterval(findBullet12, 100);
        function findBullet12() {
          for (let i = 0; i < rightBullets.length; i++) {
            if (rightBullets[i].offsetTop < 0) {
              rightBullets[i].style.top =
                img.offsetTop + img.offsetWidth / 2 - 30 + "px";
              rightBullets[i].style.left =
                img.offsetLeft + img.offsetWidth - 5 + "px";
              break;
            }
          }
        }
        //右侧蓝色子弹开火
        let bulletFlyTimer12 = setInterval(bulletFlay12, 10);
        function bulletFlay12() {
          for (let j = 0; j < rightBullets.length; j++) {
            if (rightBullets[j].offsetTop > -20) {
              rightBullets[j].style.top = rightBullets[j].offsetTop - 20 + "px";
            }
          }
          for (let allEnemie of allEnemies) {
            for (let rightBullet of rightBullets) {
              if (judgeIntersect(allEnemie, rightBullet)) {
                rightBullet.style.top = randomInitialPosition11() + "px";
                allEnemie.style.top = randomInitialPosition11() + "px";
              }
            }
          }
        }
      }
    }
  }

  function liftTheMouse() {
    document.removeEventListener("mousemove", afterClicking);
    document.removeEventListener("mouseup", liftTheMouse);
  }
  //开火
  let bulletFlyTimer = setInterval(bulletFlay, 10);
  function bulletFlay() {
    for (let j = 0; j < bullets.length; j++) {
      if (bullets[j].offsetTop > -20) {
        bullets[j].style.top = bullets[j].offsetTop - 20 + "px";
      }
    }
    //找到敌机和子弹位置并判断
    for (let enemy of enemys) {
      for (let bullet of bullets) {
        if (judgeIntersect(enemy, bullet)) {
          // bullet.style.top = randomInitialPosition11() + "px";
          enemy.style.top = randomInitialPosition11() + "px";
          // allEnemie.style.top = -500 + "px";
          // for (let enemy of enemys) {
            if (!enemy.querySelector(".boom")) {
              let boomm = document.createElement("div");
              boomm.classList.add("boom");
              enemy.append(boomm);
            // }
          }
        }
      }
    }
  }
  //找到可用敌人
  let findEnemyTimer = setInterval(findEnemy, 500);
  function findEnemy() {
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].offsetTop >= aircraft.offsetHeight) {
        enemies[i].style.top = 0 + "px";
        enemies[i].style.left = random() + "px";
      }
    }
  }

  //让敌人下落
  let enemyLandTimer = setInterval(enemyLand, randomTime());
  function enemyLand() {
    for (let j = 0; j < enemies.length; j++) {
      if (enemies[j].offsetTop > -120) {
        enemies[j].style.top = enemies[j].offsetTop + random1() + "px";
        // enemies[j].style.left = enemies[j].offsetLeft + 5 + 'px';
      }
    }
  }

  //找到大飞机敌人
  let findEnemyTimer1 = setInterval(findEnemy1, 500);
  function findEnemy1() {
    for (let i = 0; i < buses.length; i++) {
      if (buses[i].offsetTop >= aircraft.offsetHeight) {
        buses[i].style.top = 0 + "px";
        buses[i].style.left = random() + "px";
      }
    }
  }

  //让大飞机下落
  let enemyLandTimer1 = setInterval(enemyLand1, randomTime());
  function enemyLand1() {
    for (let j = 0; j < buses.length; j++) {
      if (buses[j].offsetTop > -120) {
        buses[j].style.top = buses[j].offsetTop + random1() + "px";
      }
    }
  }
  //找到中型机敌人
  let findEnemyTimer2 = setInterval(findEnemy2, 500);
  function findEnemy2() {
    for (let i = 0; i < middles.length; i++) {
      if (middles[i].offsetTop >= aircraft.offsetHeight) {
        middles[i].style.top = 0 + "px";
        middles[i].style.left = random() + "px";
      }
    }
  }

  //让中型机下落
  let enemyLandTimer2 = setInterval(enemyLand2, randomTime());
  function enemyLand2() {
    for (let j = 0; j < middles.length; j++) {
      if (middles[j].offsetTop > -120) {
        middles[j].style.top = middles[j].offsetTop + random1() + "px";
      }
    }
  }
  //找到炸弹
  let findEnemyTimer3 = setInterval(findEnemy3, 500);
  function findEnemy3() {
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].offsetTop >= aircraft.offsetHeight) {
        bombs[i].style.top = 0 + "px";
        bombs[i].style.left = random() + "px";
      }
    }
  }

  //让炸弹下落
  let enemyLandTimer3 = setInterval(enemyLand3, randomTime());
  function enemyLand3() {
    for (let j = 0; j < bombs.length; j++) {
      if (bombs[j].offsetTop > -120) {
        bombs[j].style.top = bombs[j].offsetTop + random1() + "px";
      }
    }
    //找到我方战机和道具位置并判断
    for (let porp of props) {
      if (judgeIntersect(porp, img)) {
        porp.style.top = randomInitialPosition11() + "px";
        // allEnemie.style.top = randomInitialPosition11() + 'px';
      }
    }
  }

  //找到道具
  let findEnemyTimer4 = setInterval(findEnemy4, 500);
  function findEnemy4() {
    for (let i = 0; i < bullet2s.length; i++) {
      if (bullet2s[i].offsetTop >= aircraft.offsetHeight) {
        bullet2s[i].style.top = 0 + "px";
        bullet2s[i].style.left = random() + "px";
      }
    }
  }

  //让道具下落
  let enemyLandTimer4 = setInterval(enemyLand4, randomTime());
  function enemyLand4() {
    for (let j = 0; j < bullet2s.length; j++) {
      if (bullet2s[j].offsetTop > -120) {
        bullet2s[j].style.top = bullet2s[j].offsetTop + random1() + "px";
      }
    }
  }
});
img.ondragstart = () => false;

//判断是否相交
function judgeIntersect(elA, elB) {
  let intersect1 = elA.getBoundingClientRect();
  let intersect2 = elB.getBoundingClientRect();
  let nonIntersect =
    intersect2.right < intersect1.left ||
    intersect2.left > intersect1.right ||
    intersect2.bottom < intersect1.top ||
    intersect2.top > intersect1.bottom;
  let intersect = !nonIntersect;
  return intersect;
}
//找子弹
function findBullet() {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].offsetTop < 0) {
      bullets[i].style.top =
        img.offsetTop + img.offsetWidth / 2 - 45 + "px";
      bullets[i].style.left =
        img.offsetLeft + img.offsetWidth - 31 + "px";
      break;
    }
  }
}
//找蓝色子弹
function findBullet11() {
  for (let i = 0; i < leftBullets.length; i++) {
    if (leftBullets[i].offsetTop < 0) {
      leftBullets[i].style.top =
        img.offsetTop + img.offsetWidth / 2 - 30 + "px";
      leftBullets[i].style.left =
        img.offsetLeft + img.offsetWidth - 55 + "px";
      break;
    }
  }
}