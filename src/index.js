// Connect styles
import "./styles/scss.scss"

// Connect libs

import Test from "./models/Test";
Test.sayHello();

import Game from "./models/Game";


//////////
import json from "./assets/textures.json";
import ImageLoader from "./models/ImageLoader";
ImageLoader.loadFrom(json, () => {
    console.log("Image has been load.")
});


////////
import * as PIXI from 'pixi.js';

let app;

window.addEventListener("resize", resize);

function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}



app = new PIXI.Application({ backgroundColor: 0x1099bb });

resize()

document.body.appendChild(app.view);

const game = new Game(app);

game.showDude();