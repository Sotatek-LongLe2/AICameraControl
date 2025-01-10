# Default target
.PHONY: all
all: build-all

# Git pull
.PHONY: pull
pull:
	git pull

# # Clean dist directory
# .PHONY: clean
# clean:
# 	rm -rf dist

# Install dependencies
.PHONY: install
install:
	yarn install

# Build user version
.PHONY: build-user
build-user: install
	yarn build

# Build admin version
.PHONY: build-admin
build-admin: install
	yarn build:admin

# Build both versions
.PHONY: build-all
build-all: pull install build-user build-admin

