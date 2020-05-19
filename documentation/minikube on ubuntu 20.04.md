# minikube on ubuntu 20.04

alias mk='minikube'

``` mk stop && mk delete```

then blow away .kube and .minikube in home directory 

`rm -rf .kube && rm -rf .minikube`

then start mk using kvm2

`mk start --driver=kvm2`

create the secret

`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=shhhhhhhh`

add the ingress-nginx controller - not the minikube one

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml`

then

`kubectl get services -n ingress-nginx`

it will be in a pending state so in another window

`mk tunnel`

go back to the first window and get services again and you will see that it now has an ip

type this to get the ip address for you to use

`mk ip`

then

`mk addons enable ingress`

then

`mk start` 

then 

`skaffold debug`

if it gives problems then start them all manually in the infra/k8s directory

also update the etc/hosts file if the ip from mk ip has changed