# Resposta da questão 7

```sql
create view func_depto as
select count(f.codigo) as qtd, f.cod_depto
from funcionario f
group by f.cod_depto;

select d.descricao as departamento, g.nome as gerente, fd.qtd as funcionarios
from func_depto fd left join departamento d on d.codigo=fd.cod_depto
left join funcionario g on d.cod_gerente = g.codigo;
```
