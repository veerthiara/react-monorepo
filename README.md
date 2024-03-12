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
3. Change into packages folder using `cd packages` and make directories to hold common components package eg : `mkdir homedesignsystem`
4. in root package.json add following ```"workspaces": [
    "packages/*"
  ],```. This tells npm the location of all monorepo packages.
5. Now add project into each packages folder, First inside package directory run `npx create-react-app homepro` and `npx create-react-app homeowner` to create a react project named homepro and homeowner.
6. Change the **start script** in package.json in homepro and homeowner to reflect port to use eg 
    * Homepro `"start": "PORT=3333 react-scripts start",`
    * Homeowner `"start": "PORT=3334 react-scripts start",`
7. Now add files to **homedesignsystem** package such that it has a common component being used by **homepro** and **homeowner**. eg for this project ran following command 
    * `npm init -y`
    * `npm install --save react react-dom styled-components sb`
    * `npm install --save-dev typescript @babel/preset-typescript @types/react @types/react-dom @babel/cli @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader style-loader css-loader`
    * Create .babelrc file and paste following 
      ```
        {
          "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
        }
      ```
    * Also run following to enable typescript `npx tsc --init` this will generate `tsconfig.json` and following should be the contents of it.
      ```
        {
          "compilerOptions": {
            "outDir": "./dist/",
            "noImplicitAny": true,
            "module": "es6",
            "target": "es5",
            "jsx": "react",
            "allowJs": true,
            "moduleResolution": "node"
          },
          "include": ["src/**/*"]
        }
      ```
    * Create a `webpack.config.js` which looks like following 
      ```
      const path = require("path");
      module.exports = {
        entry: "./src/index.ts", // Your library's entry point
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "homedesignsystem.js",
          library: "homedesignsystem", // Your library's name, this will be the global variable that users will use to import and access it
          libraryTarget: "umd", // This makes your library usable in various environments
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader", // Use Babel loader for JS files
                options: {
                  presets: [
                    "@babel/preset-env", // For modern JavaScript features
                    "@babel/preset-react", // For JSX
                    "@babel/preset-typescript", // For TypeScript
                  ],
                },
              },
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"], // Use these loaders for CSS files
            },
            // Add more loaders here for other file types (e.g., images, fonts)
          ],
        },
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        // Optionally configure the webpack-dev-server
        devServer: {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          port: 9000, // Default port for webpack-dev-server
        },
      };
      ```
     * Now create sample button and table that can be used in homepro and homeowner project. To do this create files so that the homedesignsystem has following structure
        ```
          my-component-library/
            src/
              components/
                Button/
                  Button.tsx
                Table/
                  Table.tsx
              index.ts
            .storybook/
            webpack.config.js
            tsconfig.json
            package.json
        ```
     * Add following scripts to homedesignsystem package.json
        ```
          "scripts": {
            "build": "webpack --mode production",
            "start": "webpack-dev-server --mode development --open"
          }
        ```
        Aslo change the main to `src/index.ts`
     *
     * `npx sb init`

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
10. Add following to root package.json 
    ```
      "scripts": {
        "start": "lerna run start"
      },
    ```
11. To start all apps run npm run start

