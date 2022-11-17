// import { useState, useEffect } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountriesList() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchCount() {
      const apiURL = 'https://ih-countries-api.herokuapp.com/countries';
      const response = await fetch(apiURL);
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    }
    fetchCount();
  }, []);

  return (
    <>
      {!loading && (
        <div
          className="col-5"
          style={{ maxHeight: '90vh', overflow: 'scroll' }}
        >
          <div className="list-group countries-list">
            {countries
              .sort((a, b) => a.alpha2Code.localeCompare(b.alpha2Code))
              .map((country) => {
                return (
                    <>
                    
                    
                  <p key={country._id} >
                  <img className='flag' src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="flag" />
                    <Link
                      className="list-group-item list-group-item-action "
                      to={country.alpha3Code}
                    >
                       {country.name.official}
                    </Link>
                  </p>
                  </>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default CountriesList;