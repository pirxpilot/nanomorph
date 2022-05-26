NODE_BIN = ./node_modules/.bin
SRC = index.js $(wildcard src/*.js test/*.js)

check: lint test

lint:
	$(NODE_BIN)/jshint $(SRC)

test:
	$(NODE_BIN)/tape test/index.js

.PHONY: check lint test
