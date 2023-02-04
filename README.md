# How to code a webapp with this skeleton

## Downloading these files

- .babelrc (hidden)
- .gitignore (hidden)
- .npmrc (hidden)
- .prettierrc (hidden)
- client (folder)
- package-lock.json
- package.json
- README.md
- server (folder)
- webpack.config.js


- git add -A
- git commit -m "Skeleton code"
- git push

## What you need to change in the skeleton

- Change the Frontend CLIENT_ID (Skeleton.js) to your team's CLIENT_ID (obtain this at http://weblab.is/gauth)
- Change the Server CLIENT_ID to the same CLIENT_ID (auth.js)
- Change the Database SRV (mongoConnectionURL) for Atlas (server.js). You got this in the MongoDB setup. remember to replace <password> and <dbname> (should be no < or > in your SRV)
- Change the Database Name for MongoDB to whatever you put in the SRV to replace <dbname> (server.js)
- (Optional) Add a favicon to your website at the path client/dist/favicon.ico
- (Optional) Update website title in client/dist/index.html
- (Optional) Update this README file ;)
- (Optional) Update the package.json file with your app name :) (line 2)


## Socket stuff: Edit at your own risk
- If you are using sockets, consider what you want to do with the FIXME in server-socket.js

the following files students do not need to edit. feel free to read them if you would like.

```
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```
