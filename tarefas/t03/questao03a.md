# Resposta da questão 3a

O Sequelize é um ORM (Object-Relational Mapping) para Node.js que permite o
mapeamento de objetos JavaScript para tabelas em um banco de dados relacional,
como o MySQL, PostgreSQL ou MariaDB.

Ele simplifica a interação com o banco de dados, fornecendo abstrações que
permite aos desenvolvedores realizar manipulação de dados usando objetos e
métodos familiares escritos em JavaScript.

## Configuração

A configuração do Sequelize para se conectar ao banco de dados é bastante
simples, basta fornecer as informações de conexão (nome do banco de dados,
usuário, senha, host e porta) para ele através de uma classe e ele realiza a
conexão.

## Definição do modelos

Os modelos para representam as tabelas do banco de dados. Cada modelo no
Sequelize é uma classe JavaScript que herda da classe `Model` do Sequelize.

No modelo, você define as colunas, os tipos de dados, os relacionamentos e as
restrições de validação de cada tabela.

## Sincronização e migração

O Sequelize pode criar automaticamente as tabelas correspondentes no banco de
dados. Isso é feito usando o recurso de sincronização do Sequelize.

É possível também usar migrações para controlar as alterações no esquema do
banco de dados ao longo do tempo, esse recurso também permite que alterações no
esquema relacional sejam desfeitas.

## Consultas e CRUD

O Sequelize fornece uma API rica para realizar consultas e operações no banco de
dados. É possível criar, recuperar, atualizar e excluir registros usando métodos
fornecidos pelo próprio ORM, como `create`, `findAll`, `findOne`, `update` e
`destroy`. O Sequelize também permite realizar consultas complexas usando sua
DSL (Domain-Specific Language) baseada em métodos encadeados.

## Associações e relacionamentos

O Sequelize facilita o mapeamento de relacionamentos entre tabelas. É possível
definir associações, como um-para-um, um-para-muitos e muitos-para-muitos,
usando os métodos de associação fornecidos pelo o ORM. Isso permite a
recuperação de objetos relacionados de forma conveniente e a execução de
consultas que envolvem várias tabelas.

## Hooks e validações

O Sequelize suporta hooks, que são funções executadas antes ou depois de
determinadas operações do banco de dados, como criação, atualização ou exclusão
de registros.

Os hooks permitem a adição de lógica personalizada para manipular dados antes ou
depois de serem salvos no banco de dados. O Sequelize também fornece recursos de
validação para garantir que os dados atendam a determinados critérios antes de
serem salvos.
