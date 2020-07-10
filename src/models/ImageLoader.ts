import * as PIXI from 'pixi.js';

interface IDictionary {
  [key: string]: string;
}

export default function ImageLoader(links: IDictionary): void {
  const loader: PIXI.Loader = PIXI.Loader.shared;

  Object.keys(links).forEach(key => {
    loader.add(key, links[key]);
  })
}
