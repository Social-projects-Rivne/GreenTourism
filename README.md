# GreenTourism

In order to run this app you need **Node.js 4.4.4** and **NPM** installed.

**Install all dependencies:**
```
npm install
```

**Start server:**
```
npm start
```

## Gulp commands:
#### Lint:
* ```gulp lint``` Run _ESLint_
* ```gulp lint-fix``` Fix some _ESLint_ errors

#### Beautify:
* ```gulp js-beautify``` Run _JS Beautifier_ on JS files
* ```gulp html-beautify``` Run _JS Beautifier_ on HTML files
* ```gulp css-beautify``` Run _CSScomb_ on CSS and Less files

#### Build:
* ```gulp build``` Build project into ```dest/```
* ```gulp clean``` Delete ```dest/```
* ```gulp build-assets``` Build all JS and CSS files
* ```gulp bower``` Add _Bower_ dependencies into ```index.ejs```
* ```gulp less``` Compile ```main.less```
* ```gulp ng-annotate``` Inject Angular dependencies
* ```gulp build-copy``` Copy _images_, _templates_, _fonts_ and _JSON_ fixtures into ```dest/```
* ```gulp copy-images``` Copy images into ```dest/```
* ```gulp copy-templates``` Copy templates into ```dest/```
* ```gulp copy-json``` Copy JSON into ```dest/```
* ```gulp copy-fonts``` Copy fonts into ```dest/```
