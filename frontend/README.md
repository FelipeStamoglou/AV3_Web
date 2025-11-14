# Distributed To-Do System  
Desenvolvimento de uma aplicação web distribuída, construída como atividade prática da disciplina **Sistemas Distribuídos** (AV1 + AV2 + AV3).  

O objetivo é implementar uma solução que demonstre, de forma aplicada, conceitos fundamentais da área, como:

- Comunicação entre processos  
- Arquitetura distribuída  
- Integração entre serviços  
- Containerização e orquestração  
- Execução isolada de ambientes  
- Comunicação via HTTP entre componentes desacoplados  

---

## 1. Visão Geral do Projeto  

Este projeto consiste em uma aplicação **To-Do List** desenvolvida em uma arquitetura distribuída.  

A solução é composta por três serviços principais:

1. **Frontend (React + Vite)**  
2. **Backend (FastAPI – Python)**  
3. **Banco de Dados (PostgreSQL)**  

E um quarto componente fundamental:

4. **Servidor Nginx**, responsável por servir o frontend e atuar como proxy reverso para o backend.

Toda a solução é executada de forma integrada via **Docker Compose**, garantindo reprodutibilidade e isolamento entre os módulos.

---

## 2. Arquitetura da Aplicação  

A arquitetura segue o padrão cliente-servidor distribuído:

[Frontend - React] -> [NGINX Reverse Proxy] -> [Backend - FastAPI] -> PostgreSQL


### Componentes:

- **Frontend (Porta: 5173 – interno)**  
  Interface do usuário, desenvolvida em React + Vite.

- **Nginx (Porta: 80)**  
  Responsável por servir os arquivos estáticos do frontend e redirecionar chamadas de API para o backend.

- **Backend FastAPI (Porta: 8000)**  
  Exposição das rotas REST utilizadas pelo frontend.

- **PostgreSQL (Porta: 5432)**  
  Armazena as tarefas persistidas no sistema.

---

## 3. Tecnologias Utilizadas  

### **Frontend**
- React.js  
- Vite  
- JSX  
- CSS  
- Fetch API (consumo do backend)  

### **Backend**
- FastAPI  
- Python 3.10+  
- SQLAlchemy  
- Pydantic  
- Uvicorn  

### **Banco de Dados**
- PostgreSQL 15  
- ORM via SQLAlchemy  

### **Infraestrutura**
- Docker  
- Docker Compose  
- Nginx  

---

## 4. Funcionalidades  

A aplicação implementa um CRUD simples de tarefas:

### **Criar tarefa**
Usuário insere um título e adiciona uma nova tarefa à lista.

### **Listar tarefas**
O frontend consome o endpoint `/tasks` para exibir a lista atualizada.

### **Editar estado (concluída/não concluída)**
Alteração do campo `is_done` via checkbox.

### **Excluir tarefa**
Remoção permanente da tarefa armazenada no banco.

> Observação: Optou-se por NÃO implementar autenticação, considerando o escopo da disciplina e o prazo disponível para o grupo.

---

## 5. Estrutura de Pastas  [Em Andamento]



---

## 6. Como Executar o Projeto

###  Requisitos
- Docker  
- Docker Compose  

---

### **1. Clonar o repositório**

```bash
git clone https://github.com/FelipeStamoglou/AV3_Web
```
### 2. Construir e subir todos os serviços
```bash
docker-compose up --build
```
### 3. Acessar a aplicação

Frontend (via Nginx):
```bash
http://localhost
```

API (FastAPI):
```bash
http://localhost/api/docs
```

Banco:

```bash
PostgreSQL exposto internamente ao cluster Docker
```
--- 
## 7. Comunicação Entre os Serviços

A comunicação ocorre da seguinte forma:

- O frontend realiza chamadas para /api/tasks
- O Nginx intercepta e redireciona a requisição para o backend
- O FastAPI processa a requisição e acessa o PostgreSQL
- O backend retorna a resposta ao frontend

Essa organização isola responsabilidades e demonstra conceitos fundamentais de sistemas distribuídos, como:

- desacoplamento
- comunicação via protocolos padronizados
- serviços isolados
- escalabilidade modular

---

## 8. Justificativa Técnica

A escolha das tecnologias foi guiada por:

**React + Vite**

Permite uma interface responsiva, modular e moderna, com rápido tempo de build.

**FastAPI**

Framework leve, assíncrono e com tipagem forte, ideal para arquiteturas distribuídas.

**PostgreSQL**

Banco relacional robusto, adequado para persistência de dados estruturados.

**Docker + Compose**

Facilita o empacotamento, transporte e execução distribuída dos serviços.

**Nginx**

Atua como proxy reverso, realizando a mediação entre os serviços.

---

## 9. Integrantes do Grupo

- Nathalia Ohana – Desenvolvimento do frontend e integração com API

- Felipe Stamaglou – Backend (FastAPI) e modelagem com PostgreSQL

- Andrei – Infraestrutura, Docker e Nginx

---

## 10. Considerações Finais

Este projeto demonstra, de forma prática, uma arquitetura distribuída composta por múltiplos serviços independentes que se comunicam entre si através de interfaces bem definidas.

A abordagem aplicada está alinhada aos temas estudados na disciplina de Sistemas Distribuídos, cobrindo desde comunicação entre processos até containerização e integração via proxy reverso.

---
## 11. Endpoints da API (Backend – FastAPI)

A API do backend foi construída utilizando FastAPI e segue o padrão REST.  

A seguir, apresenta-se a documentação dos endpoints utilizados pelo frontend para consumo e gerenciamento das tarefas.

Cada tarefa é composta pelos seguintes campos:

- **id** (int): identificador único
- **title** (str): título da tarefa
- **description** (str): descrição detalhada
- **is_done** (bool): indica se a tarefa foi concluída (padrão: false)

---

###  **GET /tasks/**
Retorna todas as tarefas cadastradas no banco de dados.

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Reunião do grupo",
    "description": "Discutir divisão das atividades da AV3",
    "is_done": false
  }
]
```

### POST /tasks/
Cria uma nova tarefa no sistema.

Body esperado:
```json
{
  "title": "Título da tarefa",
  "description": "Descrição detalhada da tarefa"
}
```
Exemplo de resposta:
```json
{
  "id": 7,
  "title": "Título da tarefa",
  "description": "Descrição detalhada da tarefa",
  "is_done": false
}
```

### PUT /tasks/{id}
Atualiza todos os campos de uma tarefa existente.

Body possível:
```json
{
  "title": "Novo título",
  "description": "Nova descrição",
  "is_done": true
}
```

Resposta:
```json
{
  "id": 7,
  "title": "Novo título",
  "description": "Nova descrição",
  "is_done": true
}
```

### PATCH /tasks/{id}/toggle
Altera automaticamente o estado de conclusão da tarefa, invertendo is_done.

Resposta:
```json
{
  "id": 7,
  "title": "Reunião do grupo",
  "description": "Discutir divisão das tarefas",
  "is_done": true
}
```

### DELETE /tasks/{id}
Remove uma tarefa do sistema permanentemente.

Resposta:
```json
{
  "detail": "Tarefa removida com sucesso"
}
```

Observações importantes:
- Os endpoints seguem o padrão RESTful.
- Todas as respostas seguem o formato JSON.
- As rotas serão mapeadas automaticamente na interface /docs gerada pelo próprio FastAPI.
- O frontend consome exclusivamente esses endpoints para manter o sistema sincronizado.

--- 

## 12. Tabela Resumida dos Endpoints da API

A tabela abaixo resume os principais endpoints disponibilizados pelo backend,incluindo método HTTP, rota, descrição e corpo esperado.

| Método | Rota                | Descrição                                                        | Corpo (JSON)                                                                 |
|--------|----------------------|------------------------------------------------------------------|-------------------------------------------------------------------------------|
| GET    | `/tasks/`            | Lista todas as tarefas cadastradas                              | —                                                                             |
| POST   | `/tasks/`            | Cria uma nova tarefa                                             | `{ "title": "str", "description": "str" }`                                    |
| PUT    | `/tasks/{id}`        | Atualiza completamente uma tarefa existente                      | `{ "title": "str", "description": "str", "is_done": boolean }`                |
| PATCH  | `/tasks/{id}/toggle` | Alterna automaticamente o estado `is_done` da tarefa             | —                                                                             |
| DELETE | `/tasks/{id}`        | Remove uma tarefa do sistema                                     | —                                                                             |

--- 

