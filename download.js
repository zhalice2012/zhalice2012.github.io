const fs = require('fs');
const https = require('https');

const version = '4.2.62' // ok

const url = `https://cdn.jsdelivr.net/npm/libpag@${version}/lib/libpag.min.js`;
const outputPath = `./lib/libpag.${version}.js`;

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(outputPath, () => {});
      reject(error);
    });
  });
}

downloadFile(url, outputPath)
  .then(() => {
    console.log(`File downloaded successfully: ${outputPath}`);
  })
  .catch((error) => {
    console.error(`Error downloading file: ${error.message}`);
  });
