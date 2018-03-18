const walkSync = require('walk-sync');
const fs = require('fs');
const cheerio = require('cheerio');

const startPath = 'presentations';
const path = walkSync(startPath, {globs: ['**/*.html'], ignore: ['**/content/*']}) || [];

let presentations = {};
let presentationsMap = new Map();

function findTitle(html) {
  const $ = cheerio.load(html);
  return $('h1').text();
}

function addPage(name, html) {
  presentations[name] = presentations[name] || {name:name, title:findTitle(html), pages:[]};
  presentationsMap.set(name, name);
  pages = presentations[name].pages;
  const page = {title: findTitle(html), html: html};
  pages.push(page);
}

path.forEach(function (element) {
  const name = element.match(/^[^/]+/)[0];
  const fileName = './' + startPath + '/' + element;
  const html = fs.readFileSync(fileName,'utf8');
  addPage(name, html);
});


let presentationList = {presentations: []};

presentationsMap.forEach(function(name){
  const pagesJson = JSON.stringify(presentations[name], null, 2);
  fs.writeFileSync(`./${'./' + startPath + '/' + name}/pages.json`, pagesJson, 'utf8');
  presentationList.presentations.push({name: name, title: presentations[name].title});
});

const listJson = JSON.stringify(presentationList, null, 2);
fs.writeFileSync(`./list.json`, listJson, 'utf8');
