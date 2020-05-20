#!/bin/bash

cd ../tickets
docker build -t jpbutler2000/tickets .
docker push jpbutler2000/tickets

cd ../orders
docker build -t jpbutler2000/orders .
docker push jpbutler2000/orders

cd ../client
docker build -t jpbutler2000/client .
docker push jpbutler2000/client

cd ../auth
docker build -t jpbutler2000/auth .
docker push jpbutler2000/auth

docker images -f "reference=jpbutler2000/*"