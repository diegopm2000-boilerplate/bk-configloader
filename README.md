# @diegopm2000/bk-configloader

![npm (scoped)](https://img.shields.io/npm/v/@diegopm2000/bk-configloader)
![travis build](https://travis-ci.org/diegopm2000-boilerplate/bk-configloader.svg?branch=master)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=com.lapots.breed.judge:judge-rule-engine&metric=alert_status)](https://sonarcloud.io/dashboard?id=bk-configloader)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=bugs)](https://sonarcloud.io/dashboard?id=bk-configloader)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=bk-configloader)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=sqale_index)](https://sonarcloud.io/dashboard?id=bk-configloader)[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=code_smells)](https://sonarcloud.io/dashboard?id=bk-configloader)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=bk-configloader)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bk-configloader&metric=coverage)](https://sonarcloud.io/dashboard?id=bk-configloader)

BK (Bokarte) Config Loader

Utility to be used in your __Node JS__ projects to allow loading configuration files from a local file in your system or loading from a remote endpoint.

## 1. Install

```shell
$ npm install @diegopm2000/bk-configloader
```

## 2. Usage

### 2.1 Loading config from file

Loading config from file. Only json or yaml file, witn .yml and .yaml extensions are allowed.

Create this file config.yml for testing and put in the same folder of your project

```yml
---
app:
  name: example App
  description: example App - configuration obtained from local yml file
  environment: development
log:
  level: debug
express:
  port: 8080
```

Example:

```javascript
const configLoader = require('bk-configloader');

const options = {
  sourceType: configLoader.SOURCE_TYPE_FILE,
  filepath: './config.yml',
}

configLoader.load(options)
  .then((result) => {
    console.log(`result: ${JSON.stringify(result)}`);
  })
  .catch((error) => {
    console.error(error.stack});
  })
```

### 2.2 Loading config from remote endpoint

Loading config from remote endpoint. 

You could use a spring cloud config based loader from GIT for example or another api rest for your convenience.

```javascript
const configLoader = require('bk-configloader');

const optionsRemote = {
  sourceType: configLoader.SOURCE_TYPE_REMOTE,
  filepath: 'config.json',
  remoteEndpoint: 'http://localhost:8888'
}

configLoader.load(options)
  .then((result) => {
    console.log(`result: ${JSON.stringify(result)}`);
  })
  .catch((error) => {
    console.error(error.stack});
  })
```
