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
  const output = [files[0]].map((file) => {
    const fileData = NodeID3.read(`${mp3DirPath}/${file}`);
    return {
      title: fileData.title,
      speaker: fileData.speaker,
      date: moment(file.replace(/\D+/g, ''), 'YYYYMMDD')
    };
  });
  console.log(output);
});
