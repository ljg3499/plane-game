// 找到子弹击中小敌人
let HitSmallEnemyTime = setInterval(HitSmallEnemy, 10);

function HitSmallEnemy() {
  for (let enemy of enemys1) {
    for (let bullet of bullets) {
      if (checkIntersect(enemy, bullet)) {
        if (!enemy.querySelector(".boom")) {
          let boomm = document.createElement("div");
          boomm.classList.add("boom");
          enemy.append(boomm);
        }

        let recoverEnemyTime = setTimeout(() => recoverEnemy(enemy), 400);
        function recoverEnemy(enemy) {
          enemy.getAttribute("enemy1-speed");
          enemy.style.left = _.random(0, bg.offsetWidth - 30) + "px";
          enemy.style.top = _.random(-100, -800) + "px";
          enemy.innerHTML = '';
        }
      }
    }
  }
}