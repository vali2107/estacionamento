CREATE DATABASE estacionamento;

USE estacionamento;

CREATE TABLE carros(
    id int auto_increment primary key,
    nome varchar(255) not null,
    marca varchar(255) not null,
	modelo varchar(255) not null,
    placa varchar(255) not null,
    vaga varchar(255) not null,
    entrada varchar(10) not null,
    saida varchar(10)
);

CREATE TABLE usuarios(
	id int auto_increment primary key,
    nome varchar(255) not null,
    senha varchar(255) not null
);

INSERT INTO usuarios(nome, senha) VALUES ("teste", "exemplo")