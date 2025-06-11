import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function FormPage() {
  const [nome, setNome] = useState('');
  const { addItem } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('Nome é obrigatório');
      return;
    }
    addItem({ nome });
    setNome('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Formulário de Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormPage;
