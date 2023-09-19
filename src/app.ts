import { ScreenBuffer } from "./screen/ScreenBuffer";
import { GameObject } from "./engine/GameObject";
import { waitForMs } from "./utils/waitForMs";

const screenWidth = 128;
const screenHeight = 64;
const screenBuffer = new ScreenBuffer(screenWidth, screenHeight);

function clearTerminal(): void {
  const clearScreen = "\x1B[2J\x1B[H"; // Clear terminal screen
  process.stdout.write(clearScreen);
}

async function main() {
  const gameObject = new GameObject(0, 0, 4, 4, 1);

  for (let y = 0; y < screenHeight; y += 4) {
    for (let x = 0; x < screenWidth; x++) {
      clearTerminal();
      screenBuffer.clear();
      gameObject.x = x;
      gameObject.y = y;
      screenBuffer.renderObject(gameObject);
      screenBuffer.render();
      console.log({ x, y });
      await waitForMs(10);
    }
  }
}

main().then(() => {});
