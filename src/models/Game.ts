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

  showDude(): void {
    const loader = PIXI.Loader.shared


    loader.add(TextureLoader('dude')).load(() => {

      let texture = PIXI.Loader.shared.resources[TextureLoader('dude')].texture
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

      const w: number = texture.baseTexture.width / 7
      const h: number = texture.baseTexture.height / 4

      let stateArray = []
      let runArray = []
      for (let i = 0; i < 4; i++) {

        let rectangle1 = new PIXI.Rectangle(w * i, h * 2, w, h)
        let rectangle2 = new PIXI.Rectangle(w * i, h * 1, w, h)

        runArray.push(new PIXI.Texture(texture.baseTexture, rectangle1))
        stateArray.push(new PIXI.Texture(texture.baseTexture, rectangle2))
      }

      const dude = new PIXI.AnimatedSprite(stateArray)

      dude.roundPixels = true
      dude.scale.set(5, 5)
      dude.animationSpeed = 0.1

      dude.x = this.app.screen.width / 2
      dude.y = this.app.screen.height / 2

      dude.play()
      let state: boolean[] = [true, false, false]

      this.app.stage.addChild(dude)
      this.app.renderer.render(this.app.stage)
      dude.anchor.x = 0.5; 
      this.app.ticker.add(delta => {
        const speed = 5 * delta;

        if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
          if (!state[1]) {
            dude.textures = runArray;
            dude.play()
            state[0] = false;
            state[1] = true;
            state[2] = false;
            dude.animationSpeed = 0.2

            if (dude.scale.x < 0) dude.scale.x *= -1;
          }

          dude.x += speed;

        } else if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
          if (!state[2]) {
            dude.textures = runArray;
            dude.play()
            state[0] = false;
            state[1] = false;
            state[2] = true;
            dude.animationSpeed = 0.2
            
            if (dude.scale.x > 0) dude.scale.x *= -1;
          }
          
          dude.x -= speed;

        } else {
          if (!state[0]){
            dude.textures = stateArray;
            dude.play();
            state[0] = true;
            state[1] = false;
            state[2] = false;
            dude.animationSpeed = 0.1

          }
        }        

        Keyboard.update();
      });
    })

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