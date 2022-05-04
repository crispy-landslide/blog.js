#!/bin/bash

if [ "$1" = "api" ] || [ "$2" = "api" ]; then
  docker stop blog-api
  docker rm blog-api
  docker rmi blogjs_blog-api
fi

if [ "$1" = "app" ] || [ "$2" = "app" ]; then
  docker stop blog-app
  docker rm blog-app
  docker rmi blogjs_blog-app
fi

if (( $# == 0 )); then
    docker compose down
    docker rmi blogjs_blog-api blogjs_blog-app
fi

docker compose up -d
