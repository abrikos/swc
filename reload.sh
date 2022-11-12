#!/bin/bash
git pull
yarn install
yarn generate
pm2 restart all