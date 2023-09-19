import { GameObject } from "../engine/GameObject";
import {
  byteArrayToBrailleString,
  screenToByteArray,
} from "./screenConversions";

export class ScreenBuffer {
  width: number;
  height: number;
  pixels: number[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = Array.from({ length: height }, () => Array(width).fill(0));
  }

  renderObject(object: GameObject) {
    for (let x = 0; x < object.w; x++) {
      for (let y = 0; y < object.h; y++) {
        const posX = x + object.x;
        const posY = y + object.y;
        if (posX >= 0 && posX < this.width && posY >= 0 && posY < this.height) {
          this.pixels[posY][posX] = object.pixel;
        }
      }
    }
  }

  clear() {
    this.pixels = Array.from({ length: this.height }, () =>
      Array(this.width).fill(0)
    );
  }

  render() {
    // Convert the pixel array to a 2D byte array
    const byteArray = screenToByteArray(this.pixels, this.width, this.height);

    // Convert the 2D byte array to a Braille string
    const brailleString = byteArrayToBrailleString(byteArray);

    // Output the Braille string to the console
    console.log(brailleString);
  }
}
