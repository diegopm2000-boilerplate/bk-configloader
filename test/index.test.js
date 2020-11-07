// index.test.js

/* eslint-disable no-underscore-dangle */
/* global describe, it, before, after */

const rewire = require('rewire');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const YAML = require('yaml');

const index = rewire('../index');
const expectations = require('./expectations');

const isJsonFile = index.__get__('isJsonFile');
const isYamlFile = index.__get__('isYamlFile');
const checkConfigExtension = index.__get__('checkConfigExtension');
const parseFile = index.__get__('parseFile');
const loadFromFile = index.__get__('loadFromFile');
const loadFromRemote = index.__get__('loadFromRemote');

describe('bk-configloader index - Tests', () => {
  describe('isJsonFile Tests', () => {
    it('isJsonFile - Successfully CASE', () => {
      // IN
      const params = './config/myfile.json';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = isJsonFile(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('isJsonFile - Does not match CASE', () => {
      // IN
      const params = './config/myfile.yml';
      // Expected
      const expectedResult = false;
      // Launch op
      const result = isJsonFile(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('isYamlFile Tests', () => {
    it('isYamlFile - Successfully yaml CASE', () => {
      // IN
      const params = './config/myfile.yaml';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = isYamlFile(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('isYamlFile - Successfully yml CASE', () => {
      // IN
      const params = './config/myfile.yml';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = isYamlFile(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('isYamlFile - Does not match CASE', () => {
      // IN
      const params = './config/myfile.json';
      // Expected
      const expectedResult = false;
      // Launch op
      const result = isYamlFile(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('checkConfigExtension Tests', () => {
    it('checkConfigExtension - Successfully yaml CASE', () => {
      // IN
      const params = './config/myfile.yaml';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = checkConfigExtension(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('checkConfigExtension - Successfully yml CASE', () => {
      // IN
      const params = './config/myfile.yml';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = checkConfigExtension(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('checkConfigExtension - Successfully json CASE', () => {
      // IN
      const params = './config/myfile.json';
      // Expected
      const expectedResult = true;
      // Launch op
      const result = checkConfigExtension(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('checkConfigExtension - Does not match CASE', () => {
      // IN
      const params = './config/myfile.txt';
      // Expected
      const expectedResult = false;
      // Launch op
      const result = checkConfigExtension(params);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('parseFile - Tests', () => {
    it('parseFile - Successfully (json file) CASE', () => {
      // IN
      const filepath = expectations.FILEPATH_JSON;
      const buffer = Buffer.from(JSON.stringify(expectations.config));
      // Expected Result
      const expectedResult = expectations.config;
      // Launch op
      const result = parseFile(filepath, buffer);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
    it('parseFile - Successfully (yml file) CASE', () => {
      // IN
      const filepath = expectations.FILEPATH_YML;
      const buffer = Buffer.from(YAML.stringify(expectations.config));
      // Expected Result
      const expectedResult = expectations.config;
      // Launch op
      const result = parseFile(filepath, buffer);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('loadFromFile - Tests', () => {
    it('loadFromFile - Successfully CASE', async () => {
      // IN
      const filepath = expectations.FILEPATH_YML;
      // Expected Result
      const expectedResult = expectations.config;
      // Launch op
      const result = await loadFromFile(filepath);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('loadFromRemote Tests', () => {
    let myStub;
    let myUnset;
    before((done) => {
      myStub = sinon.stub().resolves({ data: expectations.config });
      myUnset = index.__set__('axios.get', myStub);
      done();
    });

    after((done) => {
      myUnset();
      done();
    });
    it('execute - Successfully CASE', async () => {
      // IN
      const filepath = expectations.FILE_JSON;
      const remoteEndpoint = 'http://localhost:8888';
      // Expected
      const expectedResult = expectations.config;
      // Launch op
      const result = await loadFromRemote(filepath, remoteEndpoint);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('load Tests', () => {
    it('load Tests - checkSourceType Exception', async () => {
      // IN
      const sourceType = 'Nonsense';
      const filepath = expectations.FILE_JSON;
      const remoteEndpoint = 'none';
      // Expected
      const expectedErrorMesssage = index.ERROR_SOURCE_TYPE_NOT_VALID;
      // Launch op
      try {
        await index.load({ sourceType, filepath, remoteEndpoint });
        assert(false);
      } catch (error) {
        // Check
        expect(error.message).to.equal(expectedErrorMesssage);
      }
    });
    it('load Tests - checkConfigType Exception', async () => {
      // IN
      const sourceType = index.SOURCE_TYPE_REMOTE;
      const filepath = 'myfile.txt';
      const remoteEndpoint = 'http://localhost:8888';
      // Expected
      const expectedErrorMesssage = index.ERROR_EXTENSION_FILE_NOT_VALID;
      // Launch op
      try {
        await index.load({ sourceType, filepath, remoteEndpoint });
        assert(false);
      } catch (error) {
        // Check
        expect(error.message).to.equal(expectedErrorMesssage);
      }
    });
    describe('load Tests - Successfully CASES', async () => {
      describe('load Tests - loadFromFile - Successfully CASE', async () => {
        let myStub;
        let myUnset;
        before((done) => {
          myStub = sinon.stub().resolves(expectations.config);
          myUnset = index.__set__('loadFromFile', myStub);
          done();
        });

        after((done) => {
          myUnset();
          done();
        });
        it('load Tests - loadFromFile - Successfully CASE', async () => {
          // IN
          const sourceType = index.SOURCE_TYPE_FILE;
          const filepath = expectations.FILE_JSON;
          // Expected
          const expectedResult = expectations.config;
          // Launch op
          const result = await index.load({ sourceType, filepath });
          // Check
          expect(result).to.deep.equal(expectedResult);
        });
      });
      describe('load Tests - loadFromRemote - Successfully CASE', async () => {
        let myStub;
        let myUnset;
        before((done) => {
          myStub = sinon.stub().resolves({ data: expectations.config });
          myUnset = index.__set__('axios.get', myStub);
          done();
        });

        after((done) => {
          myUnset();
          done();
        });
        it('load Tests - loadFromRemote - Successfully CASE', async () => {
          // IN
          const sourceType = index.SOURCE_TYPE_REMOTE;
          const filepath = expectations.FILE_JSON;
          const remoteEndpoint = 'http://localhost:8888';
          // Expected
          const expectedResult = expectations.config;
          // Launch op
          const result = await index.load({ sourceType, filepath, remoteEndpoint });
          // Check
          expect(result).to.deep.equal(expectedResult);
        });
      });
    });
  });
});
