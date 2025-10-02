#!/bin/bash

podman run \
  --name mongodb \
  -p 27017:27017 \
  docker.io/mongodb/mongodb-community-server:latest
  