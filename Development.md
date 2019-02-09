# Development

For development, there are several useful npm scripts defined for a degree of comfort.

## Compiling

For compiling your code, you can use ```npm run compile```. By default, the compiled code is tested automatically.

## Continous-Compilation

If you want to compile and test your code immediately after making a file change, you can use ```npm run continous-build:bash``` or  ```npm run continous-build:windows``` repectively for windows users.

## Building releases

For creating a release, use ```npm run build```. The expected output should be

- ```dist/index.js```
- ```dist/parameters.json```
- ```dist/README.md```
- ```dist/assets/``` ← should contain images used in Readme.md

Before creating a release, it is a good thing to check its functionality with ```npm run test```.

## Serving for integration purposes

If you want to try your code in other projects, you can use ````npm run serve``` which provides a cors-enabled webserver at <http://localhost:4201>.