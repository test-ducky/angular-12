//
//
//
// Switch between running the tests or the app
const runTests = true;

//
//
//
//
//
//
//
//
//
// ##################################################
// ##################################################
// ##################################################
// ##################################################
// DO NOT EDIT BELOW ... BE CAREFUL
// ##################################################
// ##################################################
// ##################################################
// ##################################################
// ##################################################
const runApp = !runTests;

const desiredRunMode = runApp ? 'runApp' : 'runTests';
const currentRunMode = location.hash.split('#').join('');
console.log(`desired: ${desiredRunMode}`);
console.log(`current: ${currentRunMode}`);

if (currentRunMode !== desiredRunMode) {
  location.hash = desiredRunMode;
  location.reload();
  throw new Error(
    `Run mode switch detected. Auto-Reloading to ${desiredRunMode}`
  );
}

// ##################################################
// For running the App
// ##################################################
import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (runApp) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((ref) => {
      // Ensure Angular destroys itself on hot reloads.
      if (window['ngRef']) {
        window['ngRef'].destroy();
      }
      window['ngRef'] = ref;

      // Otherwise, log the boot error
    })
    .catch((err) => console.error(err));
}

// ##################################################
// For running the Tests
// ##################################################

declare var jasmine;
import './global-jasmine';
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';

import './polyfills';

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';

// Requires 'zone.js/dist/proxy.js' and 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import './tests-to-run.ts'; // All spec test files are referenced here

if (runTests) {
  doTests();
}

function doTests() {
  // This matches the dependency version
  injectCssStyleUrl(
    `https://unpkg.com/jasmine-core@3.9.0/lib/jasmine-core/jasmine.css`
  );
  const jasmineRef = `jasmineRef`;
  if (window[jasmineRef]) {
    // this looks like workaround to get 100% fresh clear run.
    // window['jasmineRef'] does nothing - it is just a flag
    // if it is not defined - we have clear run
    // if not - lets reload
    location.reload();
  } else {
    window.onload(undefined); // overwrited by jasmine, initialize env
    window[jasmineRef] = jasmine.getEnv();

    // Initialize the Angular testing environment.
    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  }
}

function injectCssStyleUrl(src: string) {
  return new Promise(function (resolve, reject) {
    let link = document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';

    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Style load error for ${src}`));

    document.head.append(link);
  });
}
