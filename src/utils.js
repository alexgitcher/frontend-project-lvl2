import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => {
  if (path.isAbsolute(filename)) {
    return filename;
  }
  return path.resolve(__dirname, '..', '__fixtures__', filename);
};

export default getFilePath;
