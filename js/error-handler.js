const ENABLE_STATE_JS = false;
const ENABLE_VCONSOLE_JS = true;

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
  errorMessage.textContent = error.toString() + '\n' + error.stack;
  errorMessages.appendChild(errorMessage);

  errorDisplay.style.display = 'block';
}

(function () {
  const logOutput = document.getElementById('logOutput');
  const originalConsoleLog = console.log;
  const logDisplay = document.getElementById('console-display');

  console.log = function (...args) {
    // Call the original console.log function
    originalConsoleLog.apply(console, args);

    // Append the log message to the logOutput element
    const logMessage = args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    logOutput.textContent += logMessage + '\n';

    logDisplay.style.display = 'block';
  };
})();

console.log('window.devicePixelRatio', window.devicePixelRatio)

if (ENABLE_STATE_JS) {
  javascript: (function () {
    var script = document.createElement('script');
    script.onload = function () {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
  })();
}

if (ENABLE_VCONSOLE_JS) {
  (function () {
    var script = document.createElement('script');
    script.onload = function () {
      var vConsole = new window.VConsole();
    };
    script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
    document.head.appendChild(script);
  })();
}

function addVersion() {
  // Find all script tags
  const scriptTags = document.getElementsByTagName('script');

  // Extract version information
  let versionInfo = '';
  for (let script of scriptTags) {
    const src = script.getAttribute('src');
    if (src && src.includes('libpag.min.js')) {
      versionInfo = src;
      // const regex = /(?:\/|^)([^/]+)\/libpag.min.js/;
      // const match = src.match(regex);
      // if (match && match[1]) {
      //   versionInfo = match[1];
      //   break;
      // }
    }
  }

  // Find header div
  const headerDiv = document.querySelector('.header');

  if (headerDiv) {
    // Create the span element with version info
    const versionSpan = document.createElement('span');
    versionSpan.className = 'version';
    versionSpan.textContent = `pag version: ${versionInfo}`;

    // Insert the span element after the header div
    headerDiv.appendChild(versionSpan);
  } else {
    console.error('Unable to find header div or extract version info');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  addVersion();
});
