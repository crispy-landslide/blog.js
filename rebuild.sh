#!/bin/bash

docker compose down

if [ "$1" = "api" ] || [ "$2" = "api" ]; then
  docker rmi blogjs_blog-api
fi

if [ "$1" = "app" ] || [ "$2" = "app" ]; then
  docker rmi blogjs_blog-app
fi

if (( $# == 0 )); then
    docker rmi blogjs_blog-api blogjs_blog-app
fi

docker compose up -d