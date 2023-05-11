CREATE OR REPLACE FUNCTION idade_funcionario(codigo_func INT)
RETURNS INT
LANGUAGE plpgsql
AS
$$
DECLARE
	idade INTEGER;
BEGIN
	SELECT DATE_PART('YEAR', AGE(datanasc))
	INTO idade
	FROM funcionario
	WHERE codigo = codigo_func;
	
	RETURN idade;
END;
$$;

CREATE OR REPLACE FUNCTION media_idade_departamento(codigo_depart INT)
RETURNS FLOAT
LANGUAGE plpgsql
AS
$$
DECLARE
	media FLOAT;
BEGIN
	SELECT AVG(idade_funcionario(f.codigo))
	INTO media
	FROM funcionario f
	WHERE f.depto = codigo_depart;
	
	RETURN media;
END;
$$;

CREATE OR REPLACE FUNCTION func_idade_maior_media_depto()
RETURNS TABLE(codigo int)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY 
	SELECT f.codigo
	FROM funcionario f
	JOIN departamento d ON f.depto = d.codigo
	WHERE idade_funcionario(f.codigo) > media_idade_departamento(f.depto);
END;
$$;
