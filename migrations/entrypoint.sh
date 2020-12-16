#!/bin/sh

if [[ $# -ne 1 ]] ; then
    echo -e "Usage:\tentrypoint \${CONNECTION_URL}"
    exit 1
fi

migrate -database "$1" -path /migrations up
