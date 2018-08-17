#!/usr/bin/env bash

echo "initializing Helm"
helm init --wait --debug

echo "installing etcd operator (Helm Chart)"
helm install stable/etcd-operator --version 0.8.0 --name etcd-operator --debug
kubectl rollout status deploy/tiller-deploy -n kube-system

kubectl  create -f manifests/etcd-cluster.yaml

echo "installing etcd cluster service"
kubectl  create -f manifests/service.json

echo "waiting for etcd cluster to turnup"
sleep 10
