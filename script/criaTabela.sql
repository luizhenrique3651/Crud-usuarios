--CRIAR BANCO, COMEÇANDO PELO schema CHAMADO SECURITY
-- DROP SCHEMA "security";

CREATE SCHEMA "security" AUTHORIZATION postgres;

-- CASO A PROPRIEDADE DO SPRING NÃO FUNCIONE, PODE-SE CRIAR A TABELA DA SEGUINTE FORMA:
CREATE TABLE "security".usuario (
	id bigserial NOT NULL,
	nome varchar NULL,
	matricula int8 NOT NULL,
	senha varchar NOT NULL
);
