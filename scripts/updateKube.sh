kubectl create secret generic jwt-secret --from-literal=JWT_KEY=seminary_school
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml


