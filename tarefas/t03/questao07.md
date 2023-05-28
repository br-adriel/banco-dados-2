# Resposta da questão 7

Foram criados os seguintes indíces:

```sql
CREATE INDEX idx_projeto_codigo ON projeto (codigo);
CREATE INDEX idx_projeto_dataconclusao ON projeto (dataconclusao);
CREATE INDEX idx_projeto_datafim ON projeto (datafim);
CREATE INDEX idx_funcionario_codigo ON funcionario (codigo);
CREATE INDEX idx_membro_codequipe ON membro (codequipe);
CREATE INDEX idx_atividade_projeto_codprojeto ON atividade_projeto (codprojeto);
CREATE INDEX idx_atividade_dataconclusao ON atividade (dataconclusao);
CREATE INDEX idx_atividade_datafim ON atividade (datafim);
```

A escolha dos campos usados no índice foi feita levando em consideração quais
deles apareciam nas cláusulas `JOIN` e `WHERE` da consulta.

Quanto a diferença de tempo para a realização da consulta, foi notado uma
melhora de 14 milisegundos para a consulta usando SQL puro, e uma piora de 10
milisegundos para o script usando ORM.

Para a constatação de tempo da consulta com SQL puro foi utilizado o select
presente dentro da função `relatorio_projetos` do arquivo
[consulta_equivalente.sql](./questao05/consulta_quivalente.sql).

Para a constatação de tempo da consulta usando ORM foi utilizado o script
[index.js](./questao06/index.js) da questão 6.

A piora de tempo percebida no script usando ORM provavelmente foi provocada pelo
fato dele realizar a consulta a cada tabela separadamente, o que faz com que a
os indexes criados nos campos de JOIN e WHERE da consulta pura não causem
qualquer efeito de melhora para esse caso.

Apesar do sequelize prover a possibilidade de realizar consultas aninhadas
através do parâmetro `include`, ao tentar utilizar esse recurso nas consultas
dos scripts das questões 5 e 6 erros de definição do modelo eram exibidos no
console, informando que as relações entre os modelos de dados não haviam sido
declaradas, apesar de terem sido feitas.

| Tipo de execução | Usando índices | Tempo da consulta (ms) |
| ---------------- | -------------- | ---------------------- |
| Com ORM          | Não            | 176.52770              |
| Com ORM          | Sim            | 186.89710              |
| SQL puro         | Não            | 126.00000              |
| SQL puro         | Sim            | 112.00000              |
