// Basic tests for toon-config
import { parseString, stringifyTOON, loadConfigSync } from '../src/index.js';
import { readFileSync } from 'fs';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(`${message}\nExpected: ${expectedStr}\nActual: ${actualStr}`);
  }
}

console.log('Running TOON Config Tests...\n');

// Test 1: Parse simple string
console.log('Test 1: Parse simple string');
const result1 = parseString('STR(name, "test")');
assertEqual(result1, "test", "Simple string parsing");
console.log('✓ Passed\n');

// Test 2: Parse integer
console.log('Test 2: Parse integer');
const result2 = parseString('INT(count, 42)');
assertEqual(result2, 42, "Integer parsing");
console.log('✓ Passed\n');

// Test 3: Parse boolean
console.log('Test 3: Parse boolean');
const result3 = parseString('BOOL(enabled, true)');
assertEqual(result3, true, "Boolean parsing");
console.log('✓ Passed\n');

// Test 4: Parse list
console.log('Test 4: Parse list');
const result4 = parseString('LIST("a", "b", "c")');
assertEqual(result4, ["a", "b", "c"], "List parsing");
console.log('✓ Passed\n');

// Test 5: Parse object
console.log('Test 5: Parse object');
const result5 = parseString(`
OBJ(
   STR(name, "test"),
   INT(age, 25)
)
`);
assertEqual(result5, { name: "test", age: 25 }, "Object parsing");
console.log('✓ Passed\n');

// Test 6: Parse nested object
console.log('Test 6: Parse nested object');
const result6 = parseString(`
OBJ(
   STR(appName, "MyApp"),
   OBJ(database,
      STR(host, "localhost"),
      INT(port, 5432)
   )
)
`);
assertEqual(result6, {
  appName: "MyApp",
  database: { host: "localhost", port: 5432 }
}, "Nested object parsing");
console.log('✓ Passed\n');

// Test 7: Type validation - should throw error
console.log('Test 7: Type validation error');
try {
  parseString('INT(value, true)');
  throw new Error("Should have thrown type error");
} catch (error) {
  assert(error.message.includes('Type mismatch'), "Type validation");
}
console.log('✓ Passed\n');

// Test 8: Stringify object to TOON
console.log('Test 8: Stringify object to TOON');
const obj = {
  name: "TestApp",
  port: 3000,
  debug: true
};
const toonStr = stringifyTOON(obj);
assert(toonStr.includes('STR(name, "TestApp")'), "Stringify contains name");
assert(toonStr.includes('INT(port, 3000)'), "Stringify contains port");
assert(toonStr.includes('BOOL(debug, true)'), "Stringify contains debug");
console.log('✓ Passed\n');

// Test 9: Round-trip (parse -> stringify -> parse)
console.log('Test 9: Round-trip conversion');
const original = {
  app: "Test",
  count: 10,
  enabled: false
};
const serialized = stringifyTOON(original);
const parsed = parseString(serialized);
assertEqual(parsed, original, "Round-trip conversion");
console.log('✓ Passed\n');

// Test 10: Load sample config file
console.log('Test 10: Load sample config file');
const config = loadConfigSync('./samples/config.toon');
assert(config.appName === "Polystudi", "Config appName");
assert(config.port === 3001, "Config port");
assert(config.debug === true, "Config debug");
assert(Array.isArray(config.modules), "Config modules is array");
assert(config.database.host === "localhost", "Config database host");
console.log('✓ Passed\n');

// Test 11: Comments support
console.log('Test 11: Comments support');
const result11 = parseString(`
## This is a comment
OBJ(
   ## Another comment
   STR(name, "test")
)
`);
assertEqual(result11, { name: "test" }, "Comments are ignored");
console.log('✓ Passed\n');

console.log('✅ All tests passed!');
