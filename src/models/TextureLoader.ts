import bunnnyImage from "../assets/bunny.png";

interface IRepository {
  [key: string]: string;
}

const TEXTURES: IRepository = {
  "bunny": bunnnyImage
}

export default function TextureLoader(key: string): string {
  return TEXTURES[key]
}
