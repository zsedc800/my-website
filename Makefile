
install:
	npm install

run:
	node app.js --inspect

run-main:
	node app/blog.js --inspect

start: install
	NODE_ENV=production ./node_modules/.bin/pm2 start app.js -i 0 --name "joe-space" --max-memory-restart 400M

restart: install
	NODE_ENV=production ./node_modules/.bin/pm2 restart "joe-space"

.PHONY: install run run-entry run-main run-fs