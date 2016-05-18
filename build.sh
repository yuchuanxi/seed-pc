#!/bin/sh

npm run build && scp -r dist/* root@ip:/home/wwww/
