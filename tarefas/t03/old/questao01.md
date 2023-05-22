# Resposta da questão 1

O framework ORM escolhido para realizar a tarefa com o [Sequelize](https://sequelize.org/),
que é um ORM para NodeJS que funciona com Postgres, MySQL, MariaDB, SQLite e
outros bancos de dados.

A essencia do Sequelize são os modelos: abstrações que representam as tabelas do
banco de dados. Através do modelo o sequelize determina o nome da tabela, o
número de atributos que ela vai ter e quais são eles.

Um modelo sequelize pode ser criado de duas formas diferentes: através da
chamada do método `sequelize.define()` ou a partir da extensão da classe Model
oferecida pela biblioteca.

Toda a manipulação de dados é realizada através de métodos aplicados sobre os
modelos definidos, como o `findAll`, que é usado para retornar todo os registros.
