# ToDo Distribuído (AV3 - Sistemas Distribuídos)

Projeto de exemplo para a AV3 — ToDo list distribuído em containers.

## Tecnologias
- Backend: FastAPI (Python)
- Banco: PostgreSQL
- Frontend: HTML + JS (estático)
- Proxy / Load Balancer: Nginx
- Orquestração local: Docker Compose

## Requisitos
- Docker e Docker Compose instalados
- (Opcional) Conta DockerHub para publicar imagens

## Como rodar (local)
1. Na raiz do projeto:
   ```bash
   docker compose up --build
