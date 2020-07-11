import Keyboard from 'pixi.js-keyboard';
import * as PIXI from 'pixi.js';

import GameBody from './GameBody'

export default function Dude(app: PIXI.Application): void {

  // Create animations
  let texture = PIXI.Loader.shared.resources['dude'].texture;
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const w: number = texture.baseTexture.width / 7;
  const h: number = texture.baseTexture.height / 4;

  let idleAnimationArray: Array<PIXI.Texture> = [];
  let runAnimationArray: Array<PIXI.Texture> = [];
  for (let i = 0; i < 4; i++) {

    let rectangle1 = new PIXI.Rectangle(w * i, h * 2, w, h);
    let rectangle2 = new PIXI.Rectangle(w * i, h * 1, w, h);

    runAnimationArray.push(new PIXI.Texture(texture.baseTexture, rectangle1));
    idleAnimationArray.push(new PIXI.Texture(texture.baseTexture, rectangle2));
  }

  // Create player
  const player: GameBody = new GameBody(idleAnimationArray, app);
  player.animationSpeed = 0.1;


  let state: boolean[] = [true, false, false]

  app.ticker.add(delta => {
    const speed = 5 * delta;

    if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
      if (!state[1]) {
        player.textures = runAnimationArray;
        player.play()
        state[0] = false;
        state[1] = true;
        state[2] = false;
        player.animationSpeed = 0.2

        if (player.scale.x < 0) player.scale.x *= -1;
      }

      player.x += speed;

    } else if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
      if (!state[2]) {
        player.textures = runAnimationArray;
        player.play()
        state[0] = false;
        state[1] = false;
        state[2] = true;
        player.animationSpeed = 0.2

        if (player.scale.x > 0) player.scale.x *= -1;
      }

      player.x -= speed;

    } else {
      if (!state[0]) {
        player.textures = idleAnimationArray;
        player.play();
        state[0] = true;
        state[1] = false;
        state[2] = false;
        player.animationSpeed = 0.1

      }
    }

    Keyboard.update();
  });


}
