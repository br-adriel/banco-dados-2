# Resposta da questão 1

```sql
CREATE VIEW salarios_dep_2 AS
SELECT f.salario
FROM funcionario f
WHERE f.cod_depto = 2;

SELECT f.nome
FROM funcionario f
WHERE f.salario > ANY (SELECT salario FROM salarios_dep_2);
```
