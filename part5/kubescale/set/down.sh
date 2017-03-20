#!/usr/bin/env bash
HOSTNAME=`hostname`
curl "http://node-etcd:3000/down/$HOSTNAME"