# Tarefa 03 - ORM

Tarefa sobre ORM encaminhada na aula de reposição do dia 17/05/2023 e
posteriormente alterada no dia seguinte

## Questões

1. Crie tarefas (issues) no repositório do grupo para você e seu grupo.

   a. Envie via discord um nome para o grupo e os componentes do grupo (máximo 5
   membros).

2. Escolha uma linguagem de programação e um Drive ODBC para conexão com o banco
   de dados. Faça um pequeno programa usando ODBC para conectar e listar as
   atividades de um projeto.

3. Escolha uma linguagem de programação e um Framework ORM.

   a. Explique um pouco como funciona o ORM escolhido.

   b. Faça um pequeno programa para conectar e listar as atividades de um
   projeto.

4. Faça um pequeno programa para povoar todas as tabelas do banco de dados com
   dados gerados randomicamente e com a possibilidade de configurar quantas
   linhas serão geradas.

   a. Pesquise e use uma biblioteca que gera dados fake.

5. Faça um procedimento sem parâmetros para exibir um relatório analítico sobre
   os projetos. Deve ser exibido o código do projeto, o nome do projeto, o nome
   do gerente, a qtd de membros da equipe do projeto, o número de dias de atraso
   do projeto, a qtd de atividades do projeto, a qtd de atividades atrasadas do
   projeto (atividades não concluídas), a soma dos dias de atraso das atividades
   atrasadas.

   a. Faça todas as funções necessárias para os cálculos usados na consulta
   deste procedimento;

   b. Situação de uma tarefa ou projeto pode ser: Planejado(a), Em andamento,
   Concluído(a);

   c. Lembre-se o atraso é calculado usando a dataFim (previsão de finalização
   da tarefa) e a data de hoje para atividades não concluídas;

   d. Para a soma de dias de atraso, só devem ser usadas atividades não
   concluídas.

6. Faça um pequeno programa para calcular quanto tempo a consulta demora para
   retornar (use 1000 linhas nas principais tabelas). Grave o resultado em uma
   tabela de Log criada para isso.

7. Crie alguns índices para a consulta da questão 5 e rode novamente o programa
   da questão 6.

### Questões descartadas

1. ~~Escolher e explicar um framework ORM.~~

2. ~~Criar um BD para testes: use o BD atividades. Crie um programa com ODBC e
   outro com ORM.~~

3. ~~Crie um programa para povoar o BD de forma randômica e com quantidade
   configurável uns 1000 registros~~

4. ~~Faça uma consulta de atividades com o cálculo de dias em atraso e se estão
   concluídas~~

5. ~~Faça um programa para medir a velocidade da consulta e gravar o resultado~~

6. ~~Crie índices para a consulta e meça a velocidade novamente~~

## Respostas

### Questão 1

- [Issue criada](https://github.com/br-adriel/banco-dados-2/issues/4)

- [Mensagem com componentes do grupo](https://discord.com/channels/689443661863583850/752544925933109308/1108799997727739954)

### Questão 2

- [Programa que lista as atividades de um projeto usando o driver pg](./questao02/)

### Questão 3

- [Explicação sobre o framework ORM sequelize](./questao03a.md)

- [Programa que lista as atividades de um projeto usando o ORM sequelize](./questao03b/)

### Questão 4

- [Programa que popula tabelas com quantidade personalizada de dados usando Fakes.js](./questao04/)

### Questão 5

- [Programa que gera um relatório descritivo dos projetos](./questao05/)

- [Consulta SQL equivalente a realizada pelo programa](./questao05/consulta_quivalente.sql)

### Questão 6

- [Programa que cronometra o tempo necessário para consultar dados do relatório da questão 5](./questao06/)

### Questão 7

- [Relatório da avaliação de tempo das consultas com e sem o uso de index](./questao07.md)
