import { useState } from 'react';
import './App.css';
import { UsuarioData } from './interface/UsuarioData';
import { useUsuarioData } from './hooks/UseUsuarioData';
import { CreateModal } from './components/create-modal/CreateModal';
import { useUsuarioDataDelete } from './hooks/UseUsuarioDataDelete'; // Importando o hook de deleção

function App() {
  const { data } = useUsuarioData();
  const { mutate: deleteUser } = useUsuarioDataDelete(); // Hook para deleção
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Exemplo: 5 itens por página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleEditUser = (usuarioData: UsuarioData) => {
    setSelectedUser(usuarioData);
    handleOpenModal();
  };

  const handleDeleteUser = (usuarioData: UsuarioData) => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${usuarioData.nome}?`)) {
      deleteUser(usuarioData); // Chama a função de deleção
    }
  };

  return (
    <div className='container'>
      <h1>Usuários</h1>

      {!currentItems ? (
        <div>Carregando...</div>
      ) : (
        <table className='user-table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Matrícula</th>
              <th>Senha</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(usuarioData => (
              <tr key={usuarioData.matricula}>
                <td>{usuarioData.nome}</td>
                <td>{usuarioData.email}</td>
                <td>{usuarioData.matricula}</td>
                <td>{'******'}</td>
                <td>
                  <button onClick={() => handleEditUser(usuarioData)}>Editar</button>
                </td>
                <td>
                  <button className='delete-button' onClick={() => handleDeleteUser(usuarioData)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={!currentItems || currentItems.length < itemsPerPage}
        >
          Próximo
        </button>
      </div>

      {isModalOpen && <CreateModal closeModal={handleOpenModal} usuario={selectedUser} />}
      <button onClick={handleOpenModal}>Novo</button>
    </div>
  );
}

export default App;
