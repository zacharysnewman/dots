import { brailleDictionary } from "../braille/brailleDictionary";

export function screenToByteArray(
  screen: number[][],
  screenWidth: number,
  screenHeight: number
): number[][] {
  // Ensure the dimensions of the byte array are half the width and a quarter of the height.
  const byteArrayWidth = screenWidth / 3;
  const byteArrayHeight = screenHeight / 5;

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

export function byteArrayToBrailleString(byteArray: number[][]): string {
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
