import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleSendFile = async () => {
    if (!remessa || !cnpj){
      toast.error('Por favor, selecione todos os campos');
      return;
    } 
    try {
      const response = await axios.post('http://192.168.10.14:3001/upload-arquivos', {
        remessa,
        cnpj,
        nomeRemessa,
      });

      if (response.status === 200) {
        toast.success('Arquivo processado com sucesso. O arquivo foi salvo na pasta Downloads.');
      }
    } catch (error) {
      toast.error('Erro ao processar os arquivos.');
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className='pb-9 flex flex-col justify-center items-center gap-10'>
      <header className='bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] w-full flex justify-between items-center px-12 py-3'>
        <img src={logo} alt='Logo Desenvolve MT' />
        <h1 className='text-4xl text-white'>Filtrar arquivo de Remessa</h1>
      </header>

      <section className='w-[80%] max-w-[80%] flex justify-between gap-8 p-4'>

        <div className='flex flex-col justify-center items-center gap-3'>
          <label htmlFor="remessa-file" className='text-xl mb-2 cursor-pointer'>Selecionar o arquivo de remessa para filtrar</label>
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

        <div className='flex flex-col justify-center items-center gap-1'>
          <label htmlFor="cnpj-file" className='text-xl cursor-pointer'>Selecionar o arquivo com os CNPJ's a filtrar</label>
          <span className='text-sm font-medium text-red-600'>Somente formato .CSV</span>
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

      {nomeRemessa && <p className='font-semibold'>Arquivo carregado: {nomeRemessa}</p>}
      {remessa && (
        <div className='flex flex-col justify-center items-center gap-2 w-[90%] border text-center overflow-x-auto py-2'>
          <h3>Conteúdo do Arquivo:</h3>
          <pre className='w-full'>{remessa}</pre>
        </div>
      )}

      <button 
        className='w-[20%] bg-[#39B1E3] text-white p-3 rounded-lg hover:bg-[#50a6ce]  transition-all duration-300'
        onClick={handleSendFile}
      >
        Enviar Arquivo
      </button>

      <ToastContainer />
    </div>
  );
};

export default App;
