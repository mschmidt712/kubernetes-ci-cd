#!/bin/bash

if [ "$1" != "" ]; then
    docker exec -i -t $1 /bin/bash
else
	echo "Type one the following containers as parameter:"
	echo ""
    docker ps --format "table {{.Names}}"
    echo ""
    echo "e.g. sh ./bash.sh magentomirror_magento_1"
fi

