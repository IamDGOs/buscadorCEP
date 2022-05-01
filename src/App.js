import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha com algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }
    
    catch{
      alert("Ops... Alguma coisa deu errado!")
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP..." value={input} onChange={ (e) => setInput(e.target.value) }></input>

        <button className='buttonSearch' onClick={handleSearch}><FiSearch size={25} color="#fff" /></button>
      </div>

      
      {Object.keys(cep).length > 0 && (
        // Object.keys(...).length > 0 está sendo usado pra retornar se tem alguma 'coisa' dentro do objeto, se tem alguma coisa entao vai ser maior q zero. No caso, se tem algum cep digitado.

        <main className='main'>

          <h2>CEP: {cep.cep}</h2>
          <span>Endereço: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/Estado: {cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
