#!/bin/sh
if [ -d './node_modules/husky' ]; then
  echo 'INSTALLATION DE HUSKY'
  npx husky install
fi