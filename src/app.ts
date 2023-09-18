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
      const brailleChar = String.fromCharCode(0x2800 + byteArray[y][x]);
      braille += brailleChar;
    }
    braille += "\n"; // Add a newline character after each row.
  }

  return braille;
}

// Define your 100x100 screen as a 2D array of 1s (on) and 0s (off)
const screenWidth = 128;
const screenHeight = 64;
const screenBuffer: number[][] = Array.from({ length: screenHeight }, () =>
  Array(screenWidth).fill(0)
);

// Convert the screen to a 2D byte array
const byteArray = screenToByteArray(screenBuffer, screenWidth, screenHeight);

// Convert the 2D byte array to a Braille string
const brailleString = byteArrayToBrailleString(byteArray);

// Output the Braille string to the console
console.log(brailleString);
