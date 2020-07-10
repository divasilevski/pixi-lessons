// Connect styles
import "./styles/scss.scss"
import * as PIXI from 'pixi.js';

import Dude from "./models/Dude";
import Bunny from "./models/Bunny";

// load resurses
import ImageLoader from "./models/ImageLoader";

ImageLoader({
    "bunny": "https://i.ibb.co/Njr5j9m/bunny.png",
    "dude": "https://i.ibb.co/mDMKpQx/pixeldude.png"
});

// Create PIXI application
let app;

window.addEventListener("resize", resize);

function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

app = new PIXI.Application({ backgroundColor: 0x1099bb });

resize()

document.body.appendChild(app.view);

// PIXI.Loader.shared.load(() => Bunny(app))
PIXI.Loader.shared.load(() => Dude(app))
