docker_build('backend', './backend')
docker_build('frontend', './frontend')

k8s_yaml([
  'k8s/backend-deployment.yaml',
  'k8s/frontend-deployment.yaml',
  'k8s/mongo-deployment.yaml',
  'k8s/redis-deployment.yaml',
  'k8s/rabbitmq-deployment.yaml',
])

k8s_resource('backend', port_forwards=5000)
k8s_resource('frontend', port_forwards=3000)
k8s_resource('mongo', port_forwards=27017)
k8s_resource('redis', port_forwards=6379)
k8s_resource('rabbitmq', port_forwards=[5672, 15672])