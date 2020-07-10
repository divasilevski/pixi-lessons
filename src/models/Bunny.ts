import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';
import Mouse from 'pixi.js-mouse';

export default function Bunny(app: PIXI.Application): void {
  let texture = PIXI.Loader.shared.resources['bunny'].texture

  const bunny = new PIXI.Sprite(texture);

  bunny.anchor.set(0.5);

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.stage.addChild(bunny);

  app.ticker.add((delta) => {
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