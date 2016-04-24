from node:argon

run mkdir -p /usr/src/app
workdir /usr/src/app
copy package.json /usr/src/app
run npm install
copy . /usr/src/app
run npm run build
expose 5000

cmd ["npm", "start"]
