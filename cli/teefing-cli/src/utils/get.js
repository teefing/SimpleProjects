import downloadGit from 'download-git-repo';
import { getAll } from './rc';

const downloadLocal = async (templateName, projectName) => {
  const config = await getAll();
  const api = `${config.registry}/${templateName}`;

  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, (err) => {
      if (err) {
        console.log('err: ', err);
        reject(err);
      }
      resolve();
    });
  });
};

export {
  downloadLocal,
};
