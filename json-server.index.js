/**
 * json-server.index.js
 */
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const jsonServer = require('json-server')

const server = jsonServer.create()
const port = 3002

let endpoints = []
let obj = {}
let files = fs.readdirSync(path.resolve(__dirname, './db/'))

console.log('\n');

files.forEach((file) => {
  if (file.indexOf('.json') > -1) {
    jsonObject = JSON.parse(fs.readFileSync('./db/' + file));

    if( isJson(fs.readFileSync('./db/' + file))) {
      endpoints.push(Object.keys(jsonObject)[0]);
      console.log('🗒    JSON file loaded : ' + file);
      _.extend(obj, require(path.resolve(__dirname, './db/', file)));
    }
  }
})

const router = jsonServer.router(obj)

server.use(jsonServer.defaults())
server.use(router)

server.listen(port, () => {
  console.log('\n⛴    JSON Server is running at http://localhost:' + port );
  for (var i = 0; i < endpoints.length; i++) {
    console.info('🥁    Endpoint : http://localhost:' + port + '/' + endpoints[i]);
  }
})

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}