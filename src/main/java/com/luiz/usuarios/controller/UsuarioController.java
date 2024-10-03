package com.luiz.usuarios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luiz.usuarios.dto.UsuarioRequestDTO;
import com.luiz.usuarios.dto.UsuarioResponseDTO;
import com.luiz.usuarios.entity.Usuario;
import com.luiz.usuarios.repository.UsuarioRepository;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

	@Autowired
	UsuarioRepository repository;
	
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@GetMapping
	public List<UsuarioResponseDTO> loadAll(){
		return repository.findAll().stream().map(UsuarioResponseDTO::new).toList();
	}
	
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@PostMapping
	public void saveUsuario(@RequestBody UsuarioRequestDTO data) {
		repository.save(new Usuario(data));
	}
	
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@PutMapping("/{id}")
	public void updateUsuario(@PathVariable Long id, @RequestBody UsuarioRequestDTO data) {
	    Usuario usuarioExistente = repository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
	    	    usuarioExistente.setNome(data.nome());
	    usuarioExistente.setMatricula(data.matricula());
	    usuarioExistente.setSenha(data.senha());

	    repository.save(usuarioExistente);
	}
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@DeleteMapping("/{id}")
	public void deleteUsuario(@PathVariable Long id) {
	    Usuario usuarioExistente = repository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
	    
	    repository.delete(usuarioExistente);
	}

}
