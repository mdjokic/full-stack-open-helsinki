import { useState, useEffect } from 'react';
import Axios from 'axios';
import Country from './Country';
import Countries from './Countries';

function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if(nameQuery.trim() === ''){
      setCountries([]);
    } else {
      Axios.get(`https://restcountries.eu/rest/v2/name/${nameQuery}`).then((response) => setCountries(response.data));
    }
  }, [nameQuery]);

  const handleNameChange = (event) => {
    setNameQuery(event.target.value);
  };

  const handleClick = (countryName) => () => {
    setNameQuery(countryName)
  }

  return (
    <div>
      <div>
        find countries <input value={nameQuery} onChange={handleNameChange} />
      </div>
      {
      countries.length === 1 ? <Country country={countries[0]} /> : 
      countries.length <= 10 ? <Countries countries={countries} handleClick={handleClick} /> :
      'Too many matches, specify another filter'
      }

    </div>
  );
}

export default App;
