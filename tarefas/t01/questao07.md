# Resposta da questão 7

```sql
create view func_depto as
select count(f.codigo) as qtd, f.codDepto
from funcionario f
group by f.codDepto;

select d.sigla as departamento, g.nome as gerente, fd.qtd as funcionarios
from func_depto fd left join departamento d on d.codigo=fd.codDepto
left join funcionario g on d.codGerente = g.codigo;
```
