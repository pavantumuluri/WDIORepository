import merge from 'deepmerge';
import { config as wdioconfConfig } from './wdio.conf.js';

const mergedConfig =await merge(wdioconfConfig, {
     
  baseUrl:'https://www.incometaxindiaefiling.gov.in/iec/foportal/', // Fixed URL typo
  waitforTimeout: 5000, // Fixed typo in property name

});
console.log('Merged Configuration:', await mergedConfig);
export const config = mergedConfig;
