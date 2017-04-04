#!/bin/bash

kubectl delete service/monitor-scale
kubectl delete deployment/monitor-scale
kubectl delete ingress/monitor-scale

