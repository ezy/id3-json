const fs = require('fs-extra');
const NodeID3 = require('node-id3');
const moment = require('moment');

const mp3DirPath = './mp3';

async function readDir() {
  try {
    const files = await fs.readdir(mp3DirPath);
    console.log('Files read');
    return files;
  } catch (err) {
    console.error(err);
  }
}

readDir().then((files) => {
  const output = files.map((file) => {
    const fileData = NodeID3.read(`${mp3DirPath}/${file}`);
    console.log(fileData);
    return {
      title: fileData.title,
      speaker: fileData.artist,
      date: moment(file.replace(/\D+/g, ''), 'YYYYMMDD')
    };
  });
  fs.writeFile('data.json', JSON.stringify(output), 'utf8', (err) => {
    if (err) {
      throw err;
    }
    console.log('The file has been saved!');
  });
});
