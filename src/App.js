import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';

const App = () => {
  const [remessa, setRemessa] = useState('');
  const [nomeRemessa, setNomeRemessa] = useState('');

  const [cnpj, setCnpj] = useState('');
  const [nomeCnpj, setNomeCnpj] = useState('');

  const handleRemessaFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textDecoder = new TextDecoder('iso-8859-1');
        const decodedText = textDecoder.decode(e.target.result);
        setRemessa(decodedText);
      };
      reader.readAsArrayBuffer(file);
      setNomeRemessa(file.name);
    }
  };

  const handleCnpjFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textDecoder = new TextDecoder('iso-8859-1');
        const decodedText = textDecoder.decode(e.target.result);
        setCnpj(decodedText);
      };
      reader.readAsArrayBuffer(file);
      setNomeCnpj(file.name);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post('http://localhost:5000/upload-arquivos', {
        remessa,
        cnpj,
      });
      // Aqui você pode fazer algo com a resposta da API, como fazer o download do arquivo filtrado
      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <body className='pb-9 flex flex-col justify-center items-center gap-10'>
      <header className='bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] w-full flex justify-between items-center px-12 py-3'>
        <img src={logo} alt='Logo Desenvolve MT' />
        <h1 className='text-4xl text-white'>Filtrar arquivo de Remessa</h1>
      </header>

      <section className='w-[80%] max-w-[80%] flex justify-between gap-8 p-4'>

        <div className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor="remessa-file" className='text-xl mb-2 '>Selecionar o arquivo de remessa para filtrar</label>
          <input
            type="file"
            id='remessa-file'
            onChange={handleRemessaFileUpload}
            className='hidden'
          />
          <label
            htmlFor="remessa-file"
            className='text-center w-[80%] py-3 rounded-lg cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 bg-[#0F2E99] text-white hover:file:bg-violet-100 
            hover:bg-[#0f2d99d8] hover:text-white transition-all duration-300'
          >
            {nomeRemessa || 'Selecione um arquivo'}
          </label>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor="cnpj-file" className='text-xl mb-2'>Selecionar o arquivo com os CNPJ's a filtrar</label>
          <input
            type="file"
            id="cnpj-file"
            onChange={handleCnpjFileUpload}
            className='hidden'
          />
          <label
            htmlFor="cnpj-file"
            className='text-center w-[80%] py-3 rounded-lg cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 bg-[#0F2E99] text-white hover:file:bg-violet-100 
            hover:bg-[#0f2d99d8] hover:text-white transition-all duration-300'
          >
            {nomeCnpj || 'Selecione um arquivo'}
          </label>
        </div>
      </section>
      
      <span className='py-[1px] rounded-lg bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] w-[90%]'></span>

      {nomeRemessa && <p>Arquivo carregado: {nomeRemessa}</p>}
      {remessa && (
        <div className='flex flex-col justify-center items-center gap-2'>
          <h3>Conteúdo do Arquivo:</h3>
          <pre>{remessa}</pre>
        </div>
      )}

      <button 
        className='bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] text-white p-3 rounded-lg'
        onClick={handleDownload}
      >
        Download arquivo filtrado
      </button>
    </body>
  );
};

export default App;
