frontend_dir = './frontend'
backend_dir = './backend'

# Build do frontend com Dockerfile.dev
# docker_build(
#   'frontend', # Nome da Imagem
#   frontend_dir, # Contexto de build
#   dockerfile='./frontend/Dockerfile.dev' # Dockerfile customizado,
# )

# Frontend com live_update (evita rebuild a cada mudança)
# docker_build(
#   'frontend',
#   frontend_dir,
#   dockerfile='./frontend/Dockerfile.dev',
#   live_update=[
#     sync('./frontend', 'app'),
#     run('npm start', trigger_mode=['src/', 'public/', 'jest.config.js'])
#   ]
# )
docker_build(
  'frontend',
  frontend_dir,
  dockerfile='./frontend/Dockerfile.dev',
  live_update=[
    sync('./frontend', '/app'),
    run('npm start', trigger=['src/', 'app/', 'jest.config.js']),
  ]
)

# Build do backend
docker_build(
    'backend:dev',  # Nome da imagem
    backend_dir # Contexto de build
)

# Manifestos do Kubernetes
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