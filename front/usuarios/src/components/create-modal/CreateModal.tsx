import { useEffect, useState } from "react";
import { useUsuarioDataMutate } from "../../hooks/UseUsuarioDataInsert"; // Mantenha o mutate para inserção
import { useUsuarioDataUpdate } from "../../hooks/UseUsuarioDataUpdate"; // Novo hook para edição
import { UsuarioData } from "../../interface/UsuarioData";
import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)} />
        </>
    )
}

interface ModalProps {
    closeModal(): void;
    usuario: UsuarioData | null; // Recebe os dados do usuário
}

export function CreateModal({ closeModal, usuario }: ModalProps) {
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState(0);
    const [senha, setSenha] = useState("");
    const [titleError, setTitleError] = useState("");
    const { mutate: insertUser, isSuccess: isInsertSuccess } = useUsuarioDataMutate(); // Para inserção
    const { mutate: updateUser, isSuccess: isUpdateSuccess } = useUsuarioDataUpdate(); // Para edição

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome);
            setMatricula(usuario.matricula);
            setSenha(usuario.senha);
        }
    }, [usuario]);

    const submit = () => {
        if (nome.trim() === "" || senha.trim() == "") {
            setTitleError("Todos os campos devem ser preenchidos");
            return;
        }
        if(matricula==0){
            setTitleError("Defina corretamente o número da matrícula")
            return
        }


        const usuarioData: UsuarioData = {
            id: usuario ? usuario.id : undefined, // Inclua o ID se existir
            nome,
            matricula,
            senha
        }

        // Verifica se é uma edição ou inserção
        if (usuario) {
            updateUser(usuarioData); // Edição
            usuario = null;
            
        } else {
            insertUser(usuarioData); // Inserção
        }
    }

    useEffect(() => {
        if (isInsertSuccess || isUpdateSuccess) {
            closeModal();
        }
    }, [isInsertSuccess, isUpdateSuccess, closeModal]);

    useEffect(() => {
        if (nome.trim() !== "") {
            setTitleError("");
        }
    }, [nome]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>{usuario ? "Editar Usuário" : "Cadastre um novo item"}</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Matrícula" value={matricula} updateValue={setMatricula} />
                    <Input label="Senha" value={senha} updateValue={setSenha} />
                    {titleError && <p className="error-message">{titleError}</p>}
                </form>
                <button 
                    onClick={submit} 
                    className="btn-secondary"
                >
                    {usuario ? "Editar" : "Criar"}
                </button>
            </div>
        </div>
    )
}
