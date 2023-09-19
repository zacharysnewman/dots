export class GameObject {
  x: number;
  y: number;
  w: number;
  h: number;
  pixel: number;

  constructor(x: number, y: number, w: number, h: number, pixel: number = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pixel = pixel;
  }
}
