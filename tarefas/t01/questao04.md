# Resposta da questão 4

```sql
select f.nome, f.salario, d.descricao
from funcionario f
  left join departamento d on f.cod_depto = d.codigo
where f.codigo <> all (
  select d.cod_gerente
  from departamento d
  where d.cod_gerente is not null);
```
