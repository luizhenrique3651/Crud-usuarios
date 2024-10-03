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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luiz.usuarios.dto.UsuarioRequestDTO;
import com.luiz.usuarios.dto.UsuarioResponseDTO;
import com.luiz.usuarios.entity.Usuario;
import com.luiz.usuarios.repository.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

	@Autowired
	UsuarioRepository repository;
	
	@Operation(description = "Carrega todos os objetos de Usuario do banco, converte para DTO")
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@GetMapping
	public List<UsuarioResponseDTO> loadAll(){
		return repository.findAll().stream().map(UsuarioResponseDTO::new).toList();
	}
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Usuário salvo com sucesso")})
	@Operation(description = "Salva um Usuário novo do banco, transformando o DTO num Objeto e persiste ele.")
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@PostMapping
	public void saveUsuario(@RequestBody UsuarioRequestDTO data) {
		repository.save(new Usuario(data));
	}
	
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso"), @ApiResponse(responseCode = "400", description = "Usuário não encontrado")})
	@Operation(description = "Atualiza um usuário do banco, fazendo um findById(), atualizando os campos do objeto e persistindo o objeto atualizado.")
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
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Usuário deletado com sucesso"), @ApiResponse(responseCode = "400", description = "Usuário não encontrado")})
	@Operation(description = "Deleta um usuário passando o ID do mesmo, fazendo um load do objeto com findById() para verificar se o mesmo existe no banco, e  caso exista, deleta o mesmo.")
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@DeleteMapping("/{id}")
	public void deleteUsuario(@PathVariable Long id) {
	    Usuario usuarioExistente = repository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
	    
	    repository.delete(usuarioExistente);
	}
	
	@ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso"), @ApiResponse(responseCode = "404", description = "Usuário não encontrado")})
	@Operation(description = "Carrega um usuário pelo nome, retornando seu DTO correspondente.")
	@CrossOrigin(origins ="*", allowedHeaders = "*")
	@GetMapping("/byNome")
	public UsuarioResponseDTO loadByNome(@RequestParam String nome) {
	    Usuario usuario = repository.findByNome(nome)
	        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

	    return new UsuarioResponseDTO(usuario); 
	}

}
