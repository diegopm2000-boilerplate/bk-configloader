# bk-configloader

![npm (scoped)](https://img.shields.io/npm/v/@diegopm2000/bk-configloader)

Bokarte Config Loader

Utility to be used in projects to allow loading configuration files from a local file in your system or loading from a remote endpoint. 

## 1. Install

```shell
$ npm install @diegopm2000/bk-configloader
```

## 2. Usage

### 2.1 Loading config from file

Loading config from file. Only json or yaml file, witn .yml and .yaml extensions are allowed.

Use this file config and put in the same folder of your project

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
