// Connect styles
import "./styles/scss.scss"

// Connect libs

import Test from "./models/Test";
Test.sayHello();

////////
import * as PIXI from 'pixi.js';

let app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);



