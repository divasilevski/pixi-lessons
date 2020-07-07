import bunnnyImage from "../assets/bunny.png";
import dudeImage from "../assets/pixeldude.png";

interface IRepository {
  [key: string]: string;
}

const TEXTURES: IRepository = {
  "bunny": bunnnyImage,
  "dude": dudeImage
}

export default function TextureLoader(key: string): string {
  return TEXTURES[key]
}
