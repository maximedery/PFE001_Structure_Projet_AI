# Infrastructure

Section with all the related code to spawn the infrastructure.

# Overview

- Docker Compose
- Run Docker Compose

## Docker Compose

### Contains
**FrontEnd Next.js** container that support hot reload;
- [localhost:3000](http://localhost:3000)

**Backend FastAPI** container that support hot reload;
- [localhost:3000](http://localhost:3001)

**MongoDb**
- localhost:27017

**MongoDb Web Manager**
- [localhost:8081](http://localhost:8081)

## Run Docker Compose

1. Open terminal in this context: <br> ``cd ./infrastructure/docker``
2. Run docker compose: <br> ``docker compose up``

---
Navigate back to [Root](../README.md) markdown.