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

  const animations = {
    idle: {
      textures: idleAnimationArray,
      animationSpeed: 0.1
    },
    runRight: {
      textures: runAnimationArray,
      animationSpeed: 0.2,
      reverseX: false
    },
    runLeft: {
      textures: runAnimationArray,
      animationSpeed: 0.2,
      reverseX: true
    }
  }

  // Create player
  const player: GameBody = new GameBody(animations, app);

  player.onTick((delta) => {
    const speed = 5 * delta;

    if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {

      if (player.animationName != 'runRight') {
        player.playAnimation('runRight');
      }

      player.x += speed;

    } else if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {

      if (player.animationName != 'runLeft') {
        player.playAnimation('runLeft');
      }

      player.x -= speed;

    } else {
      if (player.animationName != 'idle') {
        player.playAnimation('idle');
      }
    }

    Keyboard.update();
  })
}
