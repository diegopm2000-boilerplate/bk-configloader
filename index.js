// index.js

const axios = require('axios');
const readFilePromise = require('fs-readfile-promise');
const YAML = require('yaml');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES & CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const SOURCE_TYPE_FILE = 'FILE';
const SOURCE_TYPE_REMOTE = 'REMOTE';

const ERROR_SOURCE_TYPE_NOT_VALID = 'Source type not valid!';
const ERROR_EXTENSION_FILE_NOT_VALID = 'Extension file not valid!';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

const isJsonFile = (filepath) => filepath.endsWith('json');

const isYamlFile = (filepath) => filepath.endsWith('yml') || filepath.endsWith('yaml');

const checkConfigExtension = (filepath) => isYamlFile(filepath) || isJsonFile(filepath);

const checkSourceType = (sourceType) => [SOURCE_TYPE_FILE, SOURCE_TYPE_REMOTE].includes(sourceType);

const parseFile = (filepath, buffer) => {
  if (isYamlFile(filepath)) {
    return YAML.parse(buffer.toString());
  }

  return JSON.parse(buffer.toString());
};

const loadFromFile = async (filepath) => {
  const buffer = await readFilePromise(filepath);
  return parseFile(filepath, buffer);
};

const loadFromRemote = async (filepath, remoteEndpoint) => {
  const uri = `${remoteEndpoint}/${filepath}`;
  const response = await axios.get(uri);
  const { data } = response;
  return data;
};

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

const load = async ({ sourceType, filepath, remoteEndpoint }) => {
  if (!(checkSourceType(sourceType))) {
    throw new Error(ERROR_SOURCE_TYPE_NOT_VALID);
  }

  if (!checkConfigExtension(filepath)) {
    throw new Error(ERROR_EXTENSION_FILE_NOT_VALID);
  }

  let result;

  if (sourceType === SOURCE_TYPE_FILE) {
    result = await loadFromFile(filepath);
  } else {
    result = await loadFromRemote(filepath, remoteEndpoint);
  }

  return result;
};

module.exports = {
  load,
  SOURCE_TYPE_FILE,
  SOURCE_TYPE_REMOTE,
  ERROR_SOURCE_TYPE_NOT_VALID,
  ERROR_EXTENSION_FILE_NOT_VALID,
};
