# ToDo Distribuído (AV3 - Sistemas Distribuídos)

Projeto de exemplo para a AV3 — ToDo list distribuído em containers.# CENTRO UNIVERSITÁRIO SENAI CIMATEC
## Sistemas Distribuídos - Atividade Avaliativa 3 (AV3)

###  Integrantes do Grupo
* **Andrei Boulhosa de Sant'Anna**
* **Felipe Emmanouil Martires Stamoglou**
* **Nathalia Ohana Barigchum Leite**

---

# Aplicação de Tarefas (To-Do List) Distribuída

Este projeto consiste no desenvolvimento e apresentação de uma aplicação web distribuída para gerenciamento de tarefas. A solução foi arquitetada utilizando o conceito de microsserviços containerizados, demonstrando na prática a aplicação de **Proxy Reverso**, **Balanceamento de Carga** e **Persistência de Dados**.

O objetivo principal é atender aos requisitos da avaliação AV3, comprovando o domínio sobre orquestração de containers, comunicação entre serviços e escalabilidade.

##  Arquitetura da Solução

A aplicação foi desenhada para ser resiliente e escalável. O fluxo da arquitetura segue a seguinte ordem:

1.  **Cliente (Browser):** O usuário acessa a aplicação via navegador.
2.  **Gateway (Nginx):** Atua como o único ponto de entrada (Porta 80). Ele serve os arquivos estáticos do Frontend e redireciona as chamadas de API para os serviços de backend.
3.  **Balanceamento de Carga:** O Nginx distribui as requisições de API entre 3 réplicas do serviço de Backend (`backend1`, `backend2`, `backend3`) utilizando o algoritmo **Round-Robin**.
4.  **Backend (FastAPI):** Processa as regras de negócio.
5.  **Banco de Dados (PostgreSQL):** Armazenamento centralizado e persistente dos dados (usuários e notas), compartilhado entre todas as réplicas do backend.

### Diagrama de Arquitetura


##  Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla) - Interface limpa e responsiva.
* **Backend:** Python 3.11 com FastAPI e SQLAlchemy (Async).
* **Banco de Dados:** PostgreSQL 15 (Alpine).
* **Infraestrutura:**
    * **Docker:** Para containerização dos serviços.
    * **Docker Compose:** Para orquestração e definição da infraestrutura como código.
    * **Nginx:** Servidor Web, Proxy Reverso e Load Balancer.

##  Imagem no Docker Hub

Conforme requisito da atividade, a imagem customizada do backend foi publicada no Docker Hub:

* **Imagem Backend:**
```bash
docker pull andrei11537/av3-backend:latest
```
##  Como Executar o Projeto

### Pré-requisitos
* Docker e Docker Compose instalados na máquina.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone --branch Andrei https://github.com/Andrei-SantAnna/AV3_Entrega_1.git
    cd AV3_Entrega_1

    ```

2.  **Suba o ambiente:**
    Execute o comando para construir as imagens e iniciar os containers em background:
    ```bash
    docker compose up --build -d
    ```

4.  **Acesse a aplicação:**
    Abra o navegador em: `http://localhost`

##  Visualizando a Rede e IPs (Debug)

Para entender como o Docker atribuiu os IPs internos e verificar a comunicação na rede `todo-net`, você pode utilizar os seguintes comandos:

1.  **Identifique a rede:**
    ```bash
    docker network ls
    # Procure por algo como "nome_da_pasta_todo-net"
    ```

2.  **Inspecione os IPs:**
    Substitua `nome_da_rede` pelo nome encontrado acima (geralmente `av3_web_todo-net` ou similar). Requer `jq` instalado (opcional, mas facilita a leitura).

    ```bash
    docker network inspect av3_web_todo-net | jq '.[0].Containers | .[] | {name: .Name, ip: .IPv4Address}'
    ```

    **Saída esperada (Exemplo):**
    ![WhatsApp Image 2025-11-19 at 07 27 36](https://github.com/user-attachments/assets/8ee25b3a-da6c-4333-b7c6-e377d0ad966d)

##  Testando o Balanceamento de Carga


Para comprovar que o Nginx está distribuindo as requisições entre os três backends:

1.  Mantenha a aplicação aberta no navegador.
2.  No terminal, acompanhe os logs do container Nginx:
    ```bash
    docker compose logs -f list-nginx
    ```
3.  Faça login ou crie notas na aplicação.
4.  Observe nos logs que o `upstream` muda, indicando que diferentes containers (`172.x.x.3`, `172.x.x.4`, etc.) estão respondendo às requisições.

##  Erros Comuns e Soluções

Durante o desenvolvimento, estes foram alguns desafios encontrados e solucionados:

1.  **Erro: "Bind for 0.0.0.0:8000 failed: port is already allocated"**
    * *Causa:* Tentar expor a porta 8000 em todos os 3 backends simultaneamente no `docker-compose`.
    * *Solução:* Removemos a diretiva `ports` dos backends. Eles agora comunicam-se apenas internamente na rede Docker, sendo acessíveis externamente apenas via Nginx (Porta 80).

2.  **Erro de Concorrência no Banco ("Duplicate key value violates unique constraint")**
    * *Causa:* As 3 réplicas do backend iniciavam simultaneamente e tentavam criar as tabelas no banco ao mesmo tempo.
    * *Solução:* Implementamos um tratamento de exceção (`try/except IntegrityError`) e um loop de retentativa no código Python (`db.py`) para lidar com a inicialização concorrente.

3.  **Frontend não atualiza:**
    * *Causa:* Cache do navegador ou do Nginx.
    * *Solução:* O Nginx foi configurado para servir arquivos estáticos diretamente, e recomenda-se testar em aba anônima ou limpar o cache ao alterar JS/CSS.

---
**Centro Universitário SENAI CIMATEC - 2025**
