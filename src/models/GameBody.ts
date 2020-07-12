import * as PIXI from 'pixi.js';

interface IAnimations {
  [key: string]: {
    textures: PIXI.Texture[],
    animationSpeed: number
  }
}


export default class GameBody extends PIXI.AnimatedSprite {
  private _app;
  private _animations;

  constructor(animations: IAnimations, app: PIXI.Application) {
    
    // start animation
    const first = Object.keys(animations)[0];
    super(animations[first].textures);
    this.animationSpeed = animations[first].animationSpeed;
    this.play();

    this.addAnimation(animations);
    this._app = app;

    // Start settings
    this.scale.set(5, 5);

    this._app.stage.addChild(this);
    this._app.renderer.render(app.stage);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.posCenter();

    
  }

  posCenter() {
    this.x = this._app.screen.width / 2;
    this.y = this._app.screen.height / 2;
  }

  addAnimation(anims: IAnimations) {
    this._animations = Object.assign({}, anims, this._animations);
  }

  playAnimation(name: string) {
    this.textures = this._animations[name].textures;
    this.animationSpeed = this._animations[name].animationSpeed;
  }
}