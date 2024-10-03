import { useEffect, useState } from "react";
import { useUsuarioDataMutate } from "../../hooks/UseUsuarioDataInsert"; // Mantenha o mutate para inserção
import { useUsuarioDataUpdate } from "../../hooks/UseUsuarioDataUpdate"; // Novo hook para edição
import { UsuarioData } from "../../interface/UsuarioData";
import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void,
    type?: string,  // Novo: define o tipo de input (opcional)
    maxLength?: number // Novo: permite limitar o comprimento (opcional)
}

const Input = ({ label, value, updateValue, type = "text", maxLength }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input 
                value={value} 
                onChange={e => updateValue(e.target.value)} 
                type={type}
                maxLength={maxLength}
            />
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
    const [email, setEmail] = useState("");
    const [titleError, setTitleError] = useState("");
    const { mutate: insertUser, isSuccess: isInsertSuccess } = useUsuarioDataMutate(); 
    const { mutate: updateUser, isSuccess: isUpdateSuccess } = useUsuarioDataUpdate(); 

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome);
            setMatricula(usuario.matricula);
            setSenha(usuario.senha);
        }
    }, [usuario]);

    const submit = () => {
        if (nome.trim() === "" || senha.trim().length !== 6) { // Atualização: valida se a senha tem 6 dígitos
            setTitleError("Todos os campos devem ser preenchidos corretamente (senha com 6 dígitos)");
            return;
        }
        if(!isValidEmail(email)){
            setTitleError("Digite um email válido")
            return;
        }

        const usuarioData: UsuarioData = {
            id: usuario ? usuario.id : undefined, 
            nome,
            matricula,
            senha,
            email
        }

        // Verifica se é uma edição ou inserção
        if (usuario) {
            updateUser(usuarioData); 
        } else {
            insertUser(usuarioData);
        }
    }

    useEffect(() => {
        if (isInsertSuccess || isUpdateSuccess) {
            closeModal();
        }
    }, [isInsertSuccess, isUpdateSuccess, closeModal]);

    useEffect(() => {
        if (nome.trim() !== "" || senha.trim().length === 6) {
            setTitleError("");
        }
    }, [nome, senha]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close">X</button>
                <h2>{usuario ? "Editar Usuário" : "Cadastre um novo item"}</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Email" value={email} updateValue={setEmail}/>
                    <Input label="Matrícula" value={matricula} updateValue={setMatricula} />
                    <Input 
                        label="Senha" 
                        value={senha} 
                        updateValue={setSenha} 
                        type="text" 
                        maxLength={6}
                    />
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
