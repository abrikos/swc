#!/bin/bash
pm2 start backend/server.js --name="kayako-backend"
pm2 start nuxt frontend --name="kayako-frontend"
