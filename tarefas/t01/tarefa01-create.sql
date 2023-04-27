drop table if exists atividade cascade;
drop table if exists projeto cascade;
drop table if exists departamento cascade;
drop table if exists funcionario cascade;

# Criação das Tabelas

CREATE TABLE funcionario (
	codigo serial primary key,
	nome varchar(50),
	sexo char(1),
	dt_nasc date,
	salario decimal(10,2),
	cod_depto int
);

CREATE TABLE departamento (
	codigo serial,
	descricao varchar(50),
	cod_gerente int,
	PRIMARY KEY (codigo),
	FOREIGN KEY (cod_gerente) REFERENCES funcionario(codigo) on delete set null on update cascade
);

CREATE TABLE projeto (
	codigo serial,
	nome varchar(50) unique,
	descricao varchar(250),
	cod_responsavel int,
	cod_depto int,
	data_inicio date, 
	data_fim date,
	PRIMARY KEY (codigo),
	FOREIGN KEY (cod_responsavel) REFERENCES funcionario(codigo) on delete set null on update cascade,
	FOREIGN KEY (cod_depto) REFERENCES departamento(codigo) on delete set null on update cascade
);
 
CREATE TABLE atividade (
	codigo serial,
  	nome varchar(100),
	descricao varchar(250),
  	cod_responsavel int,
	data_inicio date, 
	data_fim date,
	PRIMARY KEY (codigo),
	FOREIGN KEY (cod_responsavel) REFERENCES funcionario(codigo) on delete set null on update cascade

);

create table atividade_projeto (
  cod_projeto int not null,
  cod_atividade int not null,
  foreign key (cod_projeto) references projeto(codigo),
  foreign key (cod_atividade) references atividade(codigo),
  primary key (cod_projeto, cod_atividade)
);

alter table funcionario ADD CONSTRAINT funcDeptoFK FOREIGN KEY (cod_depto) REFERENCES departamento(codigo) on delete set null on update cascade;

# Povoamento Inicial

insert into departamento
(descricao, cod_gerente)
values ('Dep História', null),
('Dep Computação', null),
('Dep Geografia', null),
(null, null);

# Adicionando Gerentes

insert into funcionario
(nome, sexo, dt_nasc, salario, cod_depto)
values ('Ana', 'F', '1988-05-07', 2500.00, 1),
('Taciano', 'M', '1980-01-25', 2500.00, 2);

update departamento set cod_gerente = 1 where codigo = 1;
update departamento set cod_gerente = 2 where codigo = 2;

# Adicionando Funcionários

insert into funcionario
(nome, sexo, dt_nasc, salario, cod_depto)
values ('Maria', 'F', '1981-07-01', 2500.00, 1),
('Josefa', 'F', '1986-09-17', 2500.00, 1),
('Carlos', 'M', '1985-11-21', 2500.00, 1),
('Humberto', 'M', '1970-05-07', 1500.00, 2),
('José', 'M', '1979-07-12', 3500.00, 2),
('Xuxa', 'F', '1970-03-28', 13500.00, null),
('Sasha', 'F', '1970-03-28', 1500.00, 1),
('Victor', 'M', '1970-03-28', 500.00, 1),
('Doisberto', 'M', '1980-07-14', 2500.00, 3),
('Tresberta', 'F', '1992-09-01', 3000.00, 3);

# Adicionando Projetos

insert into projeto(nome, descricao, cod_depto, cod_responsavel, data_inicio, data_fim)
values ('APF', 'Analisador de Ponto de Função', 2, 2, '2018-02-26', '2019-06-30'),
('Monitoria', 'Projeto de Monitoria 2019.1', 1, 6, '2019-02-26', '2019-12-30'),
('BD', 'Projeto de Banco de Dados', 3, 5, '2018-02-26', '2018-06-30'),
('ES', 'Projeto de Engenharia de Software', 1, 1, '2018-02-26', '2018-06-30');

# Adicionando Atividades

insert into atividade(nome, descricao, cod_responsavel, data_inicio, data_fim)
values ('APF - Atividade 1', 'APF - Atividade 1', 1, '2018-02-26', '2018-06-30'),
('APF - Atividade 2','APF - Atividade 2', 2, '2018-06-26', '2018-07-30'),
('APF - Atividade 3','APF - Atividade 3', 3, '2018-08-26', '2018-09-30'),
('APF - Atividade 4','APF - Atividade 4', 4, '2018-08-26', '2018-09-30'),
('APF - Atividade 5', 'APF - Atividade 5', 1, '2018-09-30', '2018-10-30'),
 ('Monitoria - Atividade 1', 'Monitoria - Atividade 1', 2, '2018-06-26', '2018-07-30'),
('BD - Atividade 1', 'BD - Atividade 1', 3, '2018-06-26', '2018-07-30'),
('BD - Atividade 2', 'BD - Atividade 2', 4, '2018-08-26', '2018-09-30'),
('BD - Atividade 3','BD - Atividade 3', 1, '2018-08-26', '2018-09-30'),
('ES - Atividade 1','ES - Atividade 1', 2, '2018-09-30', '2018-10-30'),
('ES - Atividade 2', 'ES - Atividade 2', 3, '2018-06-26', '2018-07-30');


# Adicionando atividades de projeto

insert into atividade_projeto(cod_projeto, cod_atividade)
values (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 1),
(3, 1), (3, 2), (3, 3),
(4, 1), (4, 2);