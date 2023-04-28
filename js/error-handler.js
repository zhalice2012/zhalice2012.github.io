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