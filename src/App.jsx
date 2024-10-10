import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [convertFrom, setConvertFrom] = useState('en'); 
  const [convertTo, setConvertTo] = useState('hi'); 
  const [inputText, setInputText] = useState('');
  const [convertedResult, setConvertedResult] = useState(''); 
  const [languages, setLanguages] = useState([]); 
  const [error, setError] = useState(null); 
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://google-translator9.p.rapidapi.com/v2/languages', {
          headers: {
            'x-rapidapi-key': '1fa904669fmshbe2837d4c9d2870p14d1a2jsn75519822d1ee',
            'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          }
        });
        setLanguages(response.data.data.languages); 
        
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch languages.');
        console.error(err);
      }
    };

    fetchLanguages();
  }, []);

  const translateText = async () => {

    if (!inputText) {
      alert("input box is empty")
      return;

    }

    setConvertedResult("");

    setIsButtonLoading(true);
    const options = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'x-rapidapi-key': '1fa904669fmshbe2837d4c9d2870p14d1a2jsn75519822d1ee',
        'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        q: inputText,   
        source: convertFrom,   
        target: convertTo,    
        format: 'text',
      },
    };

    try {
      const response = await axios.request(options);
      setConvertedResult(response.data.data.translations[0].translatedText); // Assuming API returns this format
      setError(null);
      setIsButtonLoading(false)
    } catch (err) {
      setError('Too many requests or another error occurred.');
      console.error(err);
    }
  };

  return (
    <div className='min-h-[100vh] pt-[15px] object-cover object-center' style={{ background: "url('https://images.unsplash.com/photo-1465146633011-14f8e0781093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <h1 className='text-center text-white font-bold text-[2em] '>Translator</h1>

      <div className='flex justify-center items-center gap-[20px] mt-[50px]'>

        <select
          name="convertFrom"
          className='border border-gray-400 text-lg px-[10px] py-[5px] rounded'
          onChange={(e) => setConvertFrom(e.target.value)}
          value={convertFrom}
        >
          {languages.length > 0 ? (
            languages.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language}
              </option>
            ))
          ) : (
            <option value="">Loading languages...</option>
          )}
        </select>
        <p className='text-white text-lg font-bold'>To</p>
  
        <select
          name="convertTo"
          className='border border-gray-400 text-lg px-[10px] py-[5px] rounded'
          onChange={(e) => setConvertTo(e.target.value)}
          value={convertTo}
        >
          {languages.length > 0 ? (
            languages.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language}
              </option>
            ))
          ) : (
            <option value="">Loading languages...</option>
          )}
        </select>
      </div>

      <div className='flex items-center justify-center gap-[50px] mt-[60px]'>
     
        <div className=' h-[300px] w-[500px]'>
          <textarea
            name="inputText"
            className='h-full w-full px-[10px] py-[5px] text-lg outline-none border border-gray-400 rounded-md focus:ring focus:ring-sky-300'
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

      
        <div className=' h-[300px] w-[500px]'>
          <textarea
            name="convertedResult"
            className='h-full w-full px-[10px] py-[5px] text-lg outline-none border border-gray-400 rounded-md'
            value={convertedResult}
            readOnly
          />
        </div>
      </div>

      
      {isButtonLoading ? (
        <button
          className='h-[40px] w-[120px] bg-sky-600 text-white rounded block mx-auto mt-[50px] hover:bg-sky-500'
        >
          Converting...
        </button>
      ) : (
          <button
            onClick={translateText}
            className='h-[40px] w-[120px] bg-sky-600 text-white rounded block mx-auto mt-[50px] hover:bg-sky-500'
          >
            Convert
          </button>
      )}

      
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default App;
