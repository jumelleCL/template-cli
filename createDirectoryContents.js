import * as fs from 'fs';
const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = newProjectPath !== '.' 
        ? `${CURR_DIR}/${newProjectPath}/${file}`
        : `${CURR_DIR}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {

      if (newProjectPath !== '.') {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      } else {
        fs.mkdirSync(`${CURR_DIR}/${file}`);
      }

      // recursive call
      if (newProjectPath !== '.') {
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      } else {
        createDirectoryContents(`${templatePath}/${file}`, `./${file}`);
      }
    }
  });
};

export default createDirectoryContents;
