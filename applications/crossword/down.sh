#!/usr/bin/env bash
HOSTNAME=`hostname`
curl "http://monitor-scale:3001/down/$HOSTNAME"
