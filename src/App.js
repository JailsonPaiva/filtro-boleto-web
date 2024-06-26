import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [remessa, setRemessa] = useState('');
  const [nomeRemessa, setNomeRemessa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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


  const handleSendFile = async () => {
    if (!remessa) {
      toast.error('Por favor, selecione todos os campos');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('http://192.168.10.14:3001/upload-arquivos', {
        remessa,
        nomeRemessa,
      });

      if (response.status === 200) {
        const { data } = response;
        toast.success(`${data.message}`);
      }
    } catch (error) {
      toast.error('Erro ao processar os arquivos.');
      console.error('Erro ao fazer a requisição:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='pb-9 flex flex-col justify-center items-center gap-10'>
      <header className='bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] w-full flex justify-between items-center px-12 py-3'>
        <img src={logo} alt='Logo Desenvolve MT' />
        <h1 className='text-4xl text-white'>Filtrar arquivo de Remessa</h1>
      </header>

      <section className='w-[80%] max-w-[80%] flex justify-center gap-8 p-4'>

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

      </section>

      <span className='py-[1px] rounded-lg bg-gradient-to-r from-[#0F2E99] to-[#39B1E3] w-[90%]'></span>

      {nomeRemessa && <p className='font-semibold'>Arquivo carregado: {nomeRemessa}</p>}
      {remessa && (
        <div className='flex flex-col justify-center items-center gap-2 w-[90%] border text-center overflow-x-auto py-2'>
          <h3>Conteúdo do Arquivo:</h3>
          <pre className='w-full'>{remessa}</pre>
        </div>
      )}

      {!isLoading ? remessa && (
          <button
            type="button"
            onClick={handleSendFile}
            className="w-[20%] py-3 rounded-lg bg-[#39B1E3] text-white 
            hover:bg-[#50a6ce] hover:text-white transition-all duration-300 flex justify-center items-center text-2xl"
          >
            Enviar
          </button>
        
      ) : remessa && (
        <button type="button" class="w-[20%] py-3 rounded-lg bg-[#39B1E3] text-white 
            hover:bg-[#50a6ce] hover:text-white transition-all duration-300 cursor-not-allowed flex justify-center items-center text-2xl">
  
            <svg class="animate-spin h-10 w-10 mr-3 ..." viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  
            </svg>
            Processando...
          </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;