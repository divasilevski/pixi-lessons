import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';
import Mouse from 'pixi.js-mouse';
import TextureLoader from "./TextureLoader"

// console.log(bunnnyImage)

export default class Game {
  app: PIXI.Application;

  constructor(app: PIXI.Application) {
    this.app = app;
  }

  showBunny(): void {
    const bunny = PIXI.Sprite.from(TextureLoader('bunny'));

    bunny.anchor.set(0.5);

    bunny.x = this.app.screen.width / 2;
    bunny.y = this.app.screen.height / 2;

    this.app.stage.addChild(bunny);

    this.app.ticker.add((delta) => {
      const speed = 5 * delta;

      if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
        bunny.x -= speed;
      if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
        bunny.x += speed;

      if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
        bunny.y -= speed;
      if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
        bunny.y += speed;

      bunny.rotation = getAngleTo(Mouse.getPosX(), Mouse.getPosY(), bunny.x, bunny.y);

      if (Mouse.isButtonDown(Mouse.Button.LEFT)) {
        bunny.x += getAngleX(speed, bunny.rotation);
        bunny.y += getAngleY(speed, bunny.rotation);
      }
      if (Mouse.isButtonDown(Mouse.Button.RIGHT)) {
        bunny.x -= getAngleX(speed, bunny.rotation);
        bunny.y -= getAngleY(speed, bunny.rotation);
      }

      Keyboard.update();
      Mouse.update();
    });
  }
}

function getAngleTo(mx, my, px, py) {
  var self = this;
  var distX = my - py;
  var distY = mx - px;
  var angle = Math.atan2(distX, distY);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}

function getAngleX(length, angle) {
  return Math.cos(angle) * length;
}

function getAngleY(length, angle) {
  return Math.sin(angle) * length;
}