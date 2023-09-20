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

const updateGameObject = (gameObject: GameObject, x: number, y: number) => {
  clearTerminal();
  screenBuffer.clear();
  gameObject.x = x;
  gameObject.y = y;
  screenBuffer.renderObject(gameObject);
  screenBuffer.render();
};

async function main() {
  const gameObject = new GameObject(0, 0, 4, 4, 1);

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      updateGameObject(gameObject, x, y);
      await waitForMs(100);
    }
  }
}

main().then(() => {});
