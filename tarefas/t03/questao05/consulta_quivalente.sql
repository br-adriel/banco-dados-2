DROP FUNCTION relatorio_projetos();

CREATE OR REPLACE FUNCTION relatorio_projetos()
RETURNS TABLE (
	codigo INTEGER,
	nome VARCHAR,
	gerente VARCHAR,
	membros_equipe BIGINT,
	dias_atraso INTEGER,
	atividades BIGINT,
	atividades_atrasadas BIGINT,
	soma_atraso BIGINT
) AS
$$
BEGIN
RETURN QUERY
	SELECT
		p.codigo,
		p.descricao AS nome,
		f.nome AS gerente,
		COUNT(m.codigo) AS membros_equipe,
		CASE WHEN p.dataconclusao IS NOT NULL
			THEN p.datafim - p.dataconclusao
			ELSE p.datafim - DATE(CURRENT_DATE AT TIME ZONE 'America/Fortaleza')
		END AS dias_atraso,
		COUNT(ap.codatividade) AS atividades,
		SUM(
			CASE
			WHEN
				a.dataconclusao IS NOT NULL AND
				a.datafim - p.dataconclusao > 0
				THEN 1
			WHEN
				a.dataconclusao IS NULL AND
				a.datafim - DATE(CURRENT_DATE AT TIME ZONE 'America/Fortaleza') > 0
				THEN 1
			ELSE 0
			END
		) AS atividades_atrasadas,
		SUM(
			CASE
			WHEN
				a.dataconclusao IS NOT NULL AND
				a.datafim - p.dataconclusao > 0
				THEN a.datafim - p.dataconclusao
			WHEN
				a.dataconclusao IS NULL AND
				a.datafim - DATE(CURRENT_DATE AT TIME ZONE 'America/Fortaleza') > 0
				THEN a.datafim - DATE(CURRENT_DATE AT TIME ZONE 'America/Fortaleza')
			ELSE 0
			END
		) AS soma_atraso
	FROM projeto p
		LEFT JOIN funcionario f ON p.responsavel = f.codigo
		LEFT JOIN membro m ON p.equipe = m.codequipe
		LEFT JOIN atividade_projeto ap ON p.codigo = ap.codprojeto
		LEFT JOIN atividade a ON a.codigo = ap.codatividade
	GROUP BY p.codigo, f.nome
	ORDER BY atividades DESC
	LIMIT 1000;
END;
$$
LANGUAGE plpgsql;

SELECT * FROM relatorio_projetos();