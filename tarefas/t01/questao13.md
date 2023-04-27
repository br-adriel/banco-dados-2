# Resposta da questão 13

```sql
select
  p.nome as projeto,
  p.data_inicio as inicio_proj,
  p.data_fim as fim_proj,
  a.descricao as atividade,
  a.data_inicio as inicio_ativ,
  a.data_fim as fim_ativ
from
  projeto p
  join atividade_projeto ap on ap.cod_projeto = p.codigo 
  join atividade a on ap.cod_atividade = a.codigo
where
  a.data_inicio < p.data_inicio
  or a.data_fim > p.data_fim;
```
