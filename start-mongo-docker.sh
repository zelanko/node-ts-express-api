#!/bin/bash

podman run \
  -d \
  --name mongodb \
  --replace \
  -p 27017:27017 \
  docker.io/mongodb/mongodb-community-server:latest