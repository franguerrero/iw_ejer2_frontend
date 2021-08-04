# Introduction 
npm install
npm run start:local

# Montar Docker
docker build --pull --rm -f "src\config\Dockerfile" -t iwejer2frontend "src\config"

docker build --pull --rm -f "Dockerfile" -t iwejer2frontend:latest "."
