# JS Diary 
📌 In browser interactive coding environment for JavaScript developers. Write JavaScript code and prepare documentation on the fly. 

[![npm Package](https://img.shields.io/npm/v/js-diary.svg)](https://www.npmjs.org/package/js-diary) 
[![downloads](https://img.shields.io/npm/dt/js-diary.svg)](http://npm-stat.com/charts.html?package=js-diary)

## Install
```
npm i js-diary
```

## Usage
```
npx js-diary serve
```

Run this command and navigate to https://localhost:4050

Now you have a live code editor running in your browser 🎉

## Features
* Live code execution
* Auto code formatting
* Write comprehensive documentation using markdown
* Use NPM packages without installing them on your local machine
* Run JSX in browser

## Usecase
Useful for small code snippets and trying NPM packages

## How To Use
* On starting the application you will see two options - Code and Text.
* The code in each code editor is all joined together in one file. For eg: If you define a variable in one cell you can refer it in any of the following cells.
* You can show any string, number, etc. and even ***React components*** by calling the `display` function.
   *  ***Note: `display` function is a function built in this environment. Call `display` multiple times to display multiple values.***
* You can delete cells or re-order them (move up or down) using buttons on the top right corner.
* To add new cells, hover on the divider between each cell.
* The code cells and text cells are resizable.

## Example 
[![2021-08-27.png](https://i.postimg.cc/PJ3CZmqT/2021-08-27.png)](https://postimg.cc/ZvNYzv3M)


***All of your changes get saved to a file you opened [js-diary](https://www.npmjs.com/package/js-diary) with. If you run `npx js-diary serve notebook.js` then all your code and text will be saved to a file named notebook.js***

By default, the name of the file is notes.js

Currently the file gets saved in JSON format ( Working on saving it in JS Format in future release ) 

## Issues
Raise an [Issue](https://github.com/karishmashuklaa/js-diary/issues) if you find any bugs/got ideas. 
<hr>

Copyright 2021 <a href="https://github.com/karishmashuklaa/">Karishma Shukla</a>
