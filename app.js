const fs = require('fs-extra');
const NodeID3 = require('node-id3');

const mp3DirPath = './mp3';

// fs.readdir(mp3DirPath, (err, items) => {
//   if (err) {
//     rej(err);
//   } else {
//     let resp = items.map((item) => item);
//     res(resp);
//   }
// });

async function readDir() {
  try {
    const files = await fs.readdir(mp3DirPath);
    console.log('Files read');
    return files;
  } catch (err) {
    console.error(err);
  }
}

readDir().then((files) => console.log('boom', files[0]));
