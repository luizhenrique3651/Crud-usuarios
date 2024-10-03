CRUD de Usuários

Este projeto é um CRUD (Create, Read, Update, Delete) de usuários, desenvolvido utilizando um front-end em React com npm e um back-end em Java com Spring Boot. O sistema permite a criação, leitura, atualização e exclusão de usuários no banco de dados.
Estrutura do Projeto

    Front-end: Aplicação React para interação com o usuário, incluindo um layout de listagem paginada de usuários, edição, e exclusão de dados.
    Back-end: API RESTful desenvolvida em Spring Boot para gerenciar os usuários no banco de dados.

Funcionalidades

    Listar Usuários: Exibe uma lista paginada de usuários.
    Cadastrar Usuários: Um formulário para adicionar novos usuários.
    Editar Usuários: Permite a edição dos dados de um usuário existente.
    Excluir Usuários: Permite excluir usuários do banco de dados.

Tecnologias Utilizadas
Front-end:

    React com TypeScript
    Axios para requisições HTTP
    React Query para gerenciamento de dados assíncronos

Back-end:

    Spring Boot para a criação da API REST
    JPA para persistência de dados
    Postgree SQL como banco de dados (pode ser configurado)

Como Rodar o Projeto
Pré-requisitos

    Node.js: Certifique-se de ter o Node.js instalado para rodar o front-end.
    Java 17+: Certifique-se de ter o JDK (versão 17 ou superior) instalado para rodar o back-end.
    Maven: Para gerenciar as dependências do projeto Java.
    Banco de Dados:  banco de dados externo como Postgree (configurável no application.properties).

Front-end:

    Basta rodar "npm install && npm run dev" no terminal na pasta front/usuarios
    
Back-end:

    Buildar o projeto com "mvn clean package" no terminal na pasta raiz do projeto, e depois
    rodar como java application a classe UsuariosApplication.java na IDE de sua preferência.
    
    
Endpoints da API

Aqui estão os principais endpoints disponíveis no back-end para gerenciamento dos usuários:

    GET /usuario: Retorna a lista de usuários.
    POST /usuario: Cria um novo usuário.
    PUT /usuario/{id}: Atualiza um usuário existente.
    DELETE /usuario/{id}: Deleta um usuário pelo ID.
    GET /usuario/byNome?nome={nome}: Busca um usuário pelo nome.
