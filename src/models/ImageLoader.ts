import * as PIXI from 'pixi.js';

interface JSON {
  [key: string]: string;
}

export default function ImageLoader(links: JSON): void {
  const loader: PIXI.Loader = PIXI.Loader.shared;

  Object.keys(links).forEach(key => {
    loader.add(key, links[key]);
  })
}
