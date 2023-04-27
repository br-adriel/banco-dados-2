# Resposta da questão 13

```sql
select
  p.nome as projeto,
  p.dataInicio as inicioProj,
  p.dataFim as fimProj,
  a.descricao as atividade,
  a.dataInicio as inicioAtiv,
  a.dataFim as fimAtiv
from
  projeto p
  join atividade a on a.codProjeto = p.codigo
where
  a.dataInicio < p.dataInicio
  or a.dataFim > p.dataFim;
```
