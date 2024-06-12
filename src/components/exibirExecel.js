// exibirExecel.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const exibirExecel = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
        className='file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#0F2E99] file:text-white
                  hover:file:bg-violet-100 cursor-pointer'
      />
      
      {data.length > 0 && (
        <table className='table-auto border-collapse border border-slate-400 mt-4'>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th className='border border-slate-300 px-4 py-2' key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td className='border border-slate-300 px-4 py-2' key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default exibirExecel;
