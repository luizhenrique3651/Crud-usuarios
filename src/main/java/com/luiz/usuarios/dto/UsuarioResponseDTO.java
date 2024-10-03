package com.luiz.usuarios.dto;

import com.luiz.usuarios.entity.Usuario;

public record UsuarioResponseDTO(Long id, String nome, Long matricula, String senha) {

	public UsuarioResponseDTO(Usuario user) {
		this(user.getId(), user.getNome(), user.getMatricula(), user.getSenha());
	}
}
