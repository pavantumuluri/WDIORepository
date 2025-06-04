// generateEnvironmentProperties.js


import path from 'path';
import fs from 'fs';
//import wdioConfig from 'D:/WebdriverIO/wdio.conf.js';
import { config as wdioConfig } from './wdio.conf.js';

// Fetch environment-specific data dynamically
const environmentData = {
  BASE_URL: 'https://example.com',
  browserNmae: wdioConfig .config.capabilities[0].browserName,
  // Add other dynamic properties...
};

// Generate the properties file content
const propertiesContent = Object.entries(environmentData)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

  const filePath = 'test/environment.properties';

// Ensure the directory exists, create it if not
const directory = path.dirname(filePath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

console.log("==="+propertiesContent)
// Write content to environment.properties file
fs.writeFileSync(filePath, propertiesContent);

console.log('environment.properties file generated successfully.');
