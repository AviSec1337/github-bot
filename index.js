const fs = require('fs');
const { DateTime } = require('luxon');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    if (n === 0) return simpleGit().push();

    const x = Math.floor(Math.random() * 55);
    const y = Math.floor(Math.random() * 7);

    const date = DateTime.now().minus({ years: 1 }).plus({ weeks: x, days: y });
    const data = { date: date.toISODate() };

    await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
    await simpleGit().add([FILE_PATH]);
    await simpleGit().commit(date.toISODate(), { '--date': date.toISODate() });

    await makeCommit(n - 1);
};

makeCommit(100);
