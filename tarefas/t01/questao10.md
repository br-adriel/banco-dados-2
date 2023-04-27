# Resposta da questão 10

```sql
select
  p.nome as nome_projeto,
  dp.descricao as dep_projeto,
  f.nome as nome_responsavel,
  df.descricao as dep_responsavel
from
  projeto p
  join departamento dp on p.cod_depto = dp.codigo
  join funcionario f on p.cod_responsavel = f.codigo
  join departamento df on f.cod_depto = df.codigo
where
  dp.codigo <> df.codigo;
```
