const Countries = ({ handleClick, countries }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name}>
        {country.name}
        <button onClick={handleClick(country.name)}>show</button>
      </div>
    ))}
  </div>
);

export default Countries;
