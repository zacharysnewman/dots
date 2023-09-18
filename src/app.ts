import { brailleDictionary } from "./brailleDictionary";

function screenToByteArray(
  screen: number[][],
  screenWidth: number,
  screenHeight: number
): number[][] {
  // Ensure the dimensions of the byte array are half the width and a quarter of the height.
  const byteArrayWidth = screenWidth / 2;
  const byteArrayHeight = screenHeight / 4;

  // Create the 2D byte array initialized with 0s.
  const byteArray: number[][] = Array(byteArrayHeight)
    .fill(null)
    .map(() => Array(byteArrayWidth).fill(0));

  for (let y = 0; y < screenHeight; y += 4) {
    for (let x = 0; x < screenWidth; x += 2) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
          const pixel = screen[y + i][x + j];
          const byteY = Math.floor(y / 4);
          const byteX = Math.floor(x / 2);
          byteArray[byteY][byteX] |= pixel << (i * 2 + j);
        }
      }
    }
  }

  return byteArray;
}

function byteArrayToBrailleString(byteArray: number[][]): string {
  let braille = "";

  for (let y = 0; y < byteArray.length; y++) {
    for (let x = 0; x < byteArray[y].length; x++) {
      const brailleChar = brailleDictionary.get(byteArray[y][x]); //String.fromCharCode(0x2800 + byteArray[y][x]);
      braille += brailleChar;
    }
    braille += "\n"; // Add a newline character after each row.
  }

  return braille;
}
class GameObject {
  x: number;
  y: number;
  pixel: number;

  constructor(x: number, y: number, pixel: number = 0) {
    this.x = x;
    this.y = y;
    this.pixel = pixel;
  }
}

class ScreenBuffer {
  width: number;
  height: number;
  pixels: number[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = Array.from({ length: height }, () => Array(width).fill(0));
  }

  renderObject(object: GameObject) {
    if (
      object.x >= 0 &&
      object.x < this.width &&
      object.y >= 0 &&
      object.y < this.height
    ) {
      this.pixels[object.y][object.x] = object.pixel;
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

// Example usage:
const screenWidth = 128;
const screenHeight = 64;
const screenBuffer = new ScreenBuffer(screenWidth, screenHeight);

// // Create a GameObject and render it
// for (let x = 0; x < 2; x++) {
//   for (let y = 0; y < 4; y++) {
//     screenBuffer.renderObject(new GameObject(x + 18, y + 18, 1));
//   }
// }

function clearTerminal(): void {
  const clearScreen = "\x1B[2J\x1B[H"; // Clear terminal screen
  process.stdout.write(clearScreen);
}

function waitForMs(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function main() {
  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      clearTerminal();
      screenBuffer.clear();
      screenBuffer.renderObject(new GameObject(x, y, 1));
      screenBuffer.render();
      console.log({ x, y });
      await waitForMs(10);
    }
  }
}

main().then(() => {});
