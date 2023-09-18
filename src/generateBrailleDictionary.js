// Generate the Braille dictionary in order of byte value and with byte literal keys
const brailleDictionary = {};
for (let i = 0; i <= 0xff; i++) {
  const binaryString = i.toString(2).padStart(8, "0");
  const brailleChar = String.fromCharCode(0x2800 + i);
  brailleDictionary[`0b${binaryString}`] = brailleChar;
}

// Output the dictionary as a TypeScript object
console.log("const brailleDictionary = {");
for (const key in brailleDictionary) {
  console.log(`  ${key}: '${brailleDictionary[key]}',`);
}
console.log("};");

// Example usage:
const byteValue = "0b00000001";
console.log(
  `Example usage: brailleDictionary[${byteValue}] = ${brailleDictionary[byteValue]}`
);
