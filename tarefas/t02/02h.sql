CREATE OR REPLACE FUNCTION atividades_func_proj(codigo_func INT, codigo_proj INT)
RETURNS INT
LANGUAGE plpgsql
AS
$$
DECLARE
	quantidade INTEGER;
BEGIN
	SELECT COUNT(a.codigo)
	INTO quantidade
	FROM projeto p
		JOIN membro m ON p.equipe = m.codequipe
		JOIN atividade_membro am ON am.codmembro = m.codigo
		JOIN atividade a ON am.codatividade = a.codigo
	WHERE p.codigo = codigo_proj AND m.codfuncionario = codigo_func;
	
	RETURN quantidade;
END;
$$;

CREATE OR REPLACE FUNCTION porcentagem_atividades_func_proj(codigo_func INT, codigo_proj INT)
RETURNS DECIMAL
LANGUAGE plpgsql
AS
$$
DECLARE
	porcentagem DECIMAL;
BEGIN
	SELECT
		ROUND(
			atividades_func_proj(codigo_func, codigo_proj)::decimal/COUNT(ap.codatividade) * 100,
			2
		)
    INTO porcentagem
    FROM projeto p
		JOIN atividade_projeto ap ON ap.codprojeto = p.codigo
	WHERE p.codigo = codigo_proj
	GROUP BY p.codigo;
	
	RETURN porcentagem;
END;
$$;
