import { useEffect, useState } from "react";
import { useUsuarioDataMutate } from "../../hooks/useUsuarioDataMutate";
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
    usuario: UsuarioData | null; //Nova propriedade para receber os dados do usuário
}

export function CreateModal({ closeModal, usuario }: ModalProps) {
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState(0);
    const [senha, setSenha] = useState("");
    const [titleError, setTitleError] = useState("");
    const { mutate, isSuccess } = useUsuarioDataMutate();

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome); //Preenche o nome
            setMatricula(usuario.matricula); //a matrícula
            setSenha(usuario.senha); //e a senha
        }
    }, [usuario]);

    const submit = () => {
        if (nome.trim() === "") {
            setTitleError("Todos os campos devem ser preenchidos");
            return;
        }

        const usuarioData: UsuarioData = {
            nome,
            matricula,
            senha
        }
        mutate(usuarioData);
    }

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]);

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
                    {usuario ? "Salvar" : "Submit"}
                </button>
            </div>
        </div>
    )
}
