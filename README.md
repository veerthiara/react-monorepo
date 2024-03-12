---
# Getting started with Lerna to create react monorepo
---
Follow these steps to initialize lerna monorepo
1. In the directory where monorepo has to be initialized run command: 
`lerna init`.
  This creates following files:
    - node_modules
    - .gitignore
    - lerna.json
    - package.json
    - package-lock.json

2. Now create packages folder using: `mkdir packages`
3. Change into packages folder using `cd packages` and make directories to hold different projects eg : `mkdir homepro homeowner homedesignsystem`
4. in root package.json add following ```"workspaces": [
    "packages/*"
  ],```. This tells npm the location of all monorepo packages.
5. Now add project files into each packages\<project_name> folder, eg we can use `npx create-react-app ./` to create a react project in homepro and homeowner.
6. Now add files to **homedesignsystem** package such that it has a common component being used by **homepro** and **homeowner**.
7. The common component package i.e **homedesignsystem** package.json will look something like this
    ```
    {
      "name": "homedesignsystem",
      "version": "1.0.0",
      "description": "",
      "main": "lib/index.js",
      "scripts": {
        "build": "babel src --out-dir lib --copy-files",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "react": "^18.2.0",
        "styled-components": "^6.1.8"
      },
      "devDependencies": {
        "@babel/cli": "^7.23.9",
        "@babel/core": "^7.24.0",
        "@babel/preset-env": "^7.24.0",
        "@babel/preset-react": "^7.23.3"
      }
    }
    ```
    `main: "lib/index.js"` specifies the file from where all exported components will be available which is generated after running script build.
8. To use the homedesignsystem package in homepro or homeowner modify its **package.json** to have **homedesignsystem** as dependency. eg this is how homepro package.json will look like
    ```
      "dependencies": {
      "@testing-library/jest-dom": "^5.17.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4",
      "homedesignsystem": "^1.0.0"
      },
    ```
9. The last step is to execute npm install which will create node_modules in the root of project. Also you should be able to use the exported components from homedesignsystem using `import {Button} from 'homedesignsystem';` where  Button is the exported component in this repo.

