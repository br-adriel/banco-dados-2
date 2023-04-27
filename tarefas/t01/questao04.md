# Resposta da questão 4

```sql
select f.nome, f.salario, d.descricao
from funcionario f
  left join departamento d on f.codDepto = d.codigo
where f.codigo <> all (
  select d.codGerente
  from departamento d
  where d.codGerente is not null);
```
