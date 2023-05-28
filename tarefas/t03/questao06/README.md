# Resposta da questão 6

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## Executando a solução

Para executar a solução você precisa ter o [NodeJS e npm](https://nodejs.org/en)
instalados em sua máquina

1. Abra a pasta `questao06` no terminal

2. Instale as dependências da resposta

   ```bash
   npm i
   ```

3. Preencha o arquivo `.env` com os dados de conexão com o seu banco de dados
   postgres

4. Crie a tabela para guardar o tempo de execução das consultas

   ```sql
   CREATE TABLE execucao (
      id SERIAL PRIMARY KEY,
      data_execucao TIMESTAMPTZ DEFAULT NOW(),
      duracao NUMERIC(10, 5)
   );

   ```

5. Execute o programa usando o comando a seguir

   ```bash
   node .
   ```
