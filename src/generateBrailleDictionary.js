// Generate the Braille dictionary with modified bit order
const brailleEntries = [];
for (let i = 0; i <= 0xff; i++) {
  // Get the bits in the modified order
  const bit1 = (i >> 0) & 0x01;
  const bit2 = (i >> 1) & 0x01;
  const bit3 = (i >> 2) & 0x01;
  const bit4 = (i >> 3) & 0x01;
  const bit5 = (i >> 4) & 0x01;
  const bit6 = (i >> 5) & 0x01;
  const bit7 = (i >> 6) & 0x01;
  const bit8 = (i >> 7) & 0x01;

  // Create the modified binary representation
  const binaryString = `0b${bit8}${bit7}${bit6}${bit3}${bit5}${bit2}${bit4}${bit1}`;
  const brailleChar = String.fromCharCode(0x2800 + i);
  brailleEntries.push([binaryString, brailleChar]);
}

// Output the dictionary as a TypeScript Map
console.log("export const brailleDictionary: Map<number, string> = new Map([");
for (const entry of brailleEntries) {
  console.log(`  [${entry[0]}, "${entry[1]}"],`);
}
console.log("]);");

// Example usage:
const byteValue = "0b00000001";
console.log(
  `Example usage: brailleDictionary.get(${byteValue}) = ${
    brailleEntries.find((entry) => entry[0] === byteValue)[1]
  }`
);
