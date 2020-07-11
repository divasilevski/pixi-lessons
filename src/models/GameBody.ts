import * as PIXI from 'pixi.js';

export default class GameBody extends PIXI.AnimatedSprite {
  private _app;
  private _anims;

  constructor(textures: PIXI.Texture[], app: PIXI.Application) {
    super(textures);
    this._app = app;

    // Start settings
    this.scale.set(5, 5);

    this._app.stage.addChild(this);
    this._app.renderer.render(app.stage);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.posCenter();

    this.play();
  }

  posCenter() {
    this.x = this._app.screen.width / 2;
    this.y = this._app.screen.height / 2;
  }

  addAnimation(anims: { [key: string]: PIXI.Texture[] }) {
    this._anims.push(anims);
  }

  playTexture() {
    
  }
}