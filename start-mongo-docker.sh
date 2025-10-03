#!/bin/bash

podman run \
  -detach \
  --name mongodb \
  --replace \
  --publish 27017:27017 \
  --volume /home/ari-zelanko/data/mongodb:/data/db:rw \
  docker.io/mongodb/mongodb-community-server:latest