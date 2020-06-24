// Connect styles
import "./styles/scss.scss"

// Connect libs

import Test from "@models/Test";
Test.sayHello();


////////

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}

PIXI.utils.sayHello(type)


