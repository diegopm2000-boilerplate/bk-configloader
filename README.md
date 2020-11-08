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

Utility to be used in your __Node JS__ projects to allow loading configuration files from a local file in your system or loading configuration files from a remote endpoint. Specially recommended to use with a Spring Cloud Config service that serves the configuration stored in a GIT repository.

## 1. Install

```shell
npm install @diegopm2000/bk-configloader
```

You can install the package in your project package json too:

```shell
npm install @diegopm2000/bk-configloader --save
```

## 2. Usage

### 2.1 Loading config from file

Loading config from file. Only json or yaml file, both .yml and .yaml extensions are allowed.

Create in your local project path this file config.yml for testing and put in the same folder of your project. Recommended for development environments.

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
const configLoader = require('@diegopm2000/bk-configloader');

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

You could use a spring cloud config based loader from GIT for example or another api rest for your convenience. Recommended for production environments, when you want that the application configuration will be decentralized.

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
