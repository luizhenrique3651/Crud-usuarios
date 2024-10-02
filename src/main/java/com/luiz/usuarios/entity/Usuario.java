package com.luiz.usuarios.entity;

import com.luiz.usuarios.dto.UsuarioRequestDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuario", schema = "securitySchema")
//cria todos getters, seters, allArgsContructor, hashCode
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

	
	private Long id;
	
	private String nome;
	
	private Long matricula;
	
	private String senha;
	
	public Usuario(UsuarioRequestDTO data) {
		this.nome = data.nome();
		this.matricula = data.matricula();
		this.senha = data.senha();
	}
}
