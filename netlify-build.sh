#!/bin/bash

# Устанавливаем Yarn глобально
npm install -g yarn@1.22.19

# Устанавливаем переменные окружения для sharp
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_DIST_BASE_URL="https://github.com/lovell/sharp-libvips/releases/download/v8.15.1/"

# Устанавливаем зависимости через Yarn
yarn install --frozen-lockfile

# Собираем проект
yarn build 