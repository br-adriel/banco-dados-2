CREATE OR REPLACE FUNCTION equipe_projeto(codigo_proj INT)
RETURNS TABLE (funcionario CHARACTER VARYING, departamento CHARACTER VARYING)
LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN QUERY
	SELECT f.nome, d.sigla
	FROM projeto p
		JOIN membro m ON p.equipe=m.codequipe
		JOIN funcionario f ON m.codfuncionario=f.codigo
		LEFT JOIN departamento d ON f.depto=d.codigo
	WHERE p.codigo = codigo_proj;
END;
$$;
