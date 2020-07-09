import * as PIXI from 'pixi.js';

interface JSON {
  [key: string]: string;
}

export default class ImageLoader {
  static loadFrom(links: JSON, callback?: () => any): void {

    const keys: Array<string> = Object.keys(links);
    const loader: PIXI.Loader = PIXI.Loader.shared;
    const count: number = keys.length - 1;

    let source: string;
    let img: HTMLImageElement;

    keys.forEach((key, index) => {
      source = links[key];

      img = document.createElement('img');
      img.src = source + '?' + Math.random();

      loader.add(key, source);

      if (callback && index === count) callback();
      
    })
  }
}
