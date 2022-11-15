#!/bin/bash
git pull
yarn generate
pm2 restart all
pm2 logs