const fs = require('fs');
const mp3DirPath = './mp3';

const readFile = new Promise((res, rej) => {
      fs.readdir(mp3DirPath, (err, items) => {
        if (err) {
          rej(err);
        } else {
          let resp = items.map((item) => item);
          res(resp);
        }
      });
    });


readFile.then((v) => {
  console.log(v[0]);
});

console.log(readFile);
