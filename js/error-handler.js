const ENABLE_STATE_JS = false;

window.onerror = function (message, source, lineno, colno, error) {
  const formattedError = new Error(`${message} (Line: ${lineno}, Column: ${colno})`);
  logError(formattedError);

  return true;
};


window.addEventListener('unhandledrejection', function (event) {
  const formattedError = new Error(`An error occurred in an async function: ${event.reason}`);
  logError(formattedError);

  event.preventDefault();
});


function logError(error) {
  const errorDisplay = document.getElementById('error-display');
  const errorMessages = document.getElementById('error-messages');

  const errorMessage = document.createElement('pre');
  errorMessage.textContent = error.stack || error.toString();

  errorMessages.appendChild(errorMessage);

  errorDisplay.style.display = 'block';
}

(function () {
  const logOutput = document.getElementById("logOutput");
  const originalConsoleLog = console.log;
  const logDisplay = document.getElementById('console-display');

  console.log = function (...args) {
      // Call the original console.log function
      originalConsoleLog.apply(console, args);

      // Append the log message to the logOutput element
      const logMessage = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
      logOutput.textContent += logMessage + '\n';

      logDisplay.style.display = 'block';
  };
})();

const nav = navigator?.userAgent || '';
const MOBILE = /(mobile)/i.test(nav) && ANDROID;
const MACOS = !(/(mobile)/i.test(nav) || MOBILE) && /Mac OS X/i.test(nav);
const IPHONE = /(iphone|ipad|ipod)/i.test(nav);
const WECHAT = /MicroMessenger/i.test(nav);
const APPLE_WEBKIT = /AppleWebKit/i.test(nav);
const SAFARI_OR_WX_IOS = /Safari/i.test(nav) && (!/Chrome/i.test(nav) || /MicroMessenger/i.test(nav));
const WORKER = typeof globalThis.importScripts === 'function';
console.log('aaa MOBILE: ',MOBILE);
console.log('aaa MACOS: ',MACOS);
console.log('aaa IPHONE: ',IPHONE);
console.log('aaa WECHAT: ',WECHAT);
console.log('aaa APPLE_WEBKIT: ',APPLE_WEBKIT);
console.log('aaa SAFARI_OR_WX_IOS: ',SAFARI_OR_WX_IOS);
console.log('aaa WORKER: ',WORKER);

if (ENABLE_STATE_JS) {
  javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
}

