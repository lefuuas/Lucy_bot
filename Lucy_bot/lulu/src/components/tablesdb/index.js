import React, { useState, useEffect } from 'react';
import './index.css'

const TabelaPaginada = () => {
  const [dados, setDados] = useState([]);
  const [pagina, setPagina] = useState(1); 
  const registrosPorPagina = 10; 

  useEffect(() => {
    
    const dadosDoBanco = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      dono: `Dono ${index + 1}`,
      bairro: `Bairro ${index + 1}`,
      contato: `Contato ${index + 1}`,
      status: index % 2 === 0 ? 'Ativo' : 'Inativo',
    }));

    
    setDados(dadosDoBanco);
  }, []);

  const indiceInicial = (pagina - 1) * registrosPorPagina;
  const indiceFinal = pagina * registrosPorPagina;
  const dadosDaPagina = dados.slice(indiceInicial, indiceFinal);

  return (
    <div>
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dono</th>
            <th>Bairro</th>
            <th>Contato</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dadosDaPagina.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dono}</td>
              <td>{item.bairro}</td>
              <td>{item.contato}</td>
              <td className={`status ${item.status === 'Ativo' ? 'ativo' : 'inativo'}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-paginacao">
        <button
          onClick={() => setPagina((prevPagina) => Math.max(prevPagina - 1, 1))}
          disabled={pagina === 1}
        >
          Página Anterior
        </button>
        <span>Página {pagina}</span>
        <button
          onClick={() =>
            setPagina((prevPagina) =>
              prevPagina + 1 <= Math.ceil(dados.length / registrosPorPagina)
                ? prevPagina + 1
                : prevPagina
            )
          }
          disabled={pagina >= Math.ceil(dados.length / registrosPorPagina)}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
};

export default TabelaPaginada;
