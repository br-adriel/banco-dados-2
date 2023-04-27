# Resposta da questão 10

```sql
select
  p.nome as nomeProjeto,
  dp.sigla as depProjeto,
  f.nome as nomeResponsavel,
  df.sigla as depResponsavel
from
  projeto p
  join departamento dp on p.codDepto = dp.codigo
  join funcionario f on p.codResponsavel = f.codigo
  join departamento df on f.codDepto = df.codigo
where
  dp.codigo <> df.codigo;
```
