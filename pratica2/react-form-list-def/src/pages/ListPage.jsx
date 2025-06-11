import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function ListPage() {
  const { items } = useContext(AppContext);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Itens Cadastrados</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
