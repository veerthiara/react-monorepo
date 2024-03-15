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
    * `npm install --save-dev typescript @babel/preset-typescript @types/react @types/react-dom @babel/cli @babel/core @babel/preset-env @babel/preset-react`
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
            "outDir": "./dist",
            "target": "es5",
            "lib": ["dom", "dom.iterable", "es2015", "es2016", "es2017"],
            "module": "esnext",
            "jsx": "react",
            "moduleResolution": "node",
            "allowSyntheticDefaultImports": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true,
            "isolatedModules": false,
            "declaration": true,
            "sourceMap": true,
            "allowJs": true,
        
          },
          "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
          "exclude": ["node_modules"],
        }
      ```
    * Now create sample button and table that can be used in homepro and homeowner project. To do this create files so that the homedesignsystem has following structure
        ```
          homedesignsystem/
            src/
              components/
                Button/
                  Button.tsx
                Table/
                  Table.tsx
              index.ts
            tsconfig.json
            package.json
        ```
        homedesignsystem/src/compoments/Button/Button.tsx code:
        ```
          import React from 'react';
          interface ButtonProps {
            children: React.ReactNode;
            onClick?: () => void;
          }
          
          export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
            <button onClick={onClick}>{children} home design system</button>
          );
        ```
       homedesignsystem/src/compoments/index.ts code:
        ```
          export * from './components/Button/Button';
        ```
        
     * Add following scripts to homedesignsystem package.json and also add/change main, types values
        ```
          "scripts": {
            "build": "rm -rf dist/ && tsc"
          }
        ```
        ```
          "main": "dist/index.js",
          "types": "dist/index.d.ts",
        ```
    
7. The common component package i.e **homedesignsystem** package.json will look something like this
    ```
    {
        "name": "homedesignsystem",
        "version": "1.0.0",
        "description": "",
        "main": "dist/index.js",
        "types": "dist/index.d.ts",
        "scripts": {
          "build": "rm -rf dist/ && tsc"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
          "@babel/cli": "^7.23.9",
          "@babel/core": "^7.24.0",
          "@babel/preset-env": "^7.24.0",
          "@babel/preset-react": "^7.23.3",
          "@babel/preset-typescript": "^7.23.3",
          "@types/react": "^18.2.65",
          "@types/react-dom": "^18.2.21",
          "typescript": "^5.4.2"
        },
        "dependencies": {
          "react": "^18.2.0"
        }
    }
    ```
8. To use the homedesignsystem package in homepro or homeowner modify its **package.json** to have **homedesignsystem** as dependency. eg this is how homepro package.json will look like. **Note: Even if we do not specify homedesignsystem in package.json it can stil be used in a package because its installed as a dependency and hoisted to root node_modules as a feature of monorepo thus making it available for other packages to use as well.**
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
        "start": "lerna run start",
        "build": "lerna run build --scope=homedesignsystem"
      },
    ```
11. First build the homedesign app using `npm run build` in root directory & then run `npm run start` which will run all apps that have a start script.

You should be able to see the button in Homepro or homeowner depending on where it was used.

<img width="667" alt="Screenshot 2024-03-13 at 10 02 34 AM" src="https://github.com/veerthiara/react-monorepo/assets/23288822/77108ff1-5c99-460e-b285-2672c88aab41">




