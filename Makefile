# NPM_REGISTRY = "--registry=http://registry.npm.taobao.org"
NPM_REGISTRY = ""
TESTS=$(shell find test -type f -name "*.spec.js")

install:
	npm install $(NPM_REGISTRY)

run:
	node --inspect app.js

run-main:
	node --inspect app/blog.js

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		$(TESTS)

test-cov:
	@NODE_ENV=test \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		$(TESTS)


start: install
	NODE_ENV=production ./node_modules/.bin/pm2 start app.js -i 0 --name "joe-space" --max-memory-restart 400M

restart: install
	NODE_ENV=production ./node_modules/.bin/pm2 restart "joe-space"

.PHONY: install run run-entry run-main run-fs test