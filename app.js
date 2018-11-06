const fs = require('fs-extra');
const NodeID3 = require('node-id3');
const moment = require('moment');
const chalk = require('chalk');
const _cliProgress = require('cli-progress');

const mp3DirPath = './mp3';
const progress = new _cliProgress.Bar({}, _cliProgress.Presets.shades_grey);

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
  progress.start(files.length, 0);
  const output = files.map((file, i) => {
    progress.update(i);
    const fileData = NodeID3.read(`${mp3DirPath}/${file}`);
    // console.log(fileData);
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
    progress.stop();
    console.log(chalk.green('\n Process run complete - file saved to ./data.json'));
  });
});
