// Example usage of toon-config
import { loadConfig, parseString, stringifyTOON } from '../src/index.js';

// Example 1: Load from file
console.log('Example 1: Load config from file');
const config = await loadConfig('./samples/config.toon');
console.log('App Name:', config.appName);
console.log('Port:', config.port);
console.log('Database Host:', config.database.host);
console.log('Modules:', config.modules);
console.log();

// Example 2: Parse TOON string
console.log('Example 2: Parse TOON string');
const toonString = `
OBJ(
   STR(service, "API Gateway"),
   INT(timeout, 5000),
   BOOL(retryEnabled, true)
)
`;
const parsed = parseString(toonString);
console.log('Parsed:', parsed);
console.log();

// Example 3: Convert JS object to TOON
console.log('Example 3: Convert JS object to TOON');
const myConfig = {
  appName: "Web3 Notes",
  version: "1.0.0",
  features: {
    auth: true,
    payments: false
  },
  ports: [3000, 3001, 3002]
};
const toon = stringifyTOON(myConfig);
console.log('Generated TOON:');
console.log(toon);
