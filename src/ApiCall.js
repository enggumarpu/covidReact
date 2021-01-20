import React from 'react';
import axios from 'axios';

export const fetchingGlobal = async () => {

    const url = 'https://disease.sh/v2/all';
    try {
        const { data } = await axios.get(`${url}`);
        return data;    
    }
    catch(error){
        return error;
    }
    //console.log(fetchReponse)    
};

export const fetchingCouData = async (c) => {

   //const urlG = 'https://disease.sh/v2/countries';
  let urlG = 'https://disease.sh/v2/countries';
  urlG = c.length ? `https://disease.sh/v2/countries/${c}` : 'https://disease.sh/v2/countries';
              console.log('urlg', urlG);
  const { data } = await axios.get(`${urlG}`);
  console.log('paskistan from api call', data);
  return data;
};


export const fetchCountries = async () => {

    // const fetchRes = await fetch(`${url}/countries`);
    // const fetchingCountries = await fetchRes.json();
    // //console.log('countries', fetchCountries);
    // return fetchingCountries;
    //const urls = 'https://corona.lmao.ninja/v2/countries/';

    try {
      const urlAn = 'https://disease.sh/v2/countries';
        //const { data: { countries } } = await axios.get(`${url}/countries`);
        //const { data } = await axios.get(`${urls}`);
        const  { data }  = await axios.get(`${urlAn}`);

        //return countries.map((country) => country.name);
        //console.log(data);
        //return data.map((country) => country.country);
        
        return data;
      } catch (error) {
        return error;
      }
}
export const fetchingDailyData = async () => {
  try {
    const { data } = await axios.get('https://covid19.mathdro.id/api/daily');
      return data;
    } catch (error) {
      return error;
    }

};

// function Bpp() {
//   const greeting = 'Hello Function Component!';
//     return <h1>{greeting}</h1>;
// }
// export default Bpp;





// (async () => {
//     const fetchRes = await fetch(`${url}/countries`);
//      const fetchCountries = await fetchRes.json();
//      console.log('countries', fetchCountries);
//      return fetchCountries;
// })();












// export const fetchData = async (country) => {
//     let changeableUrl = url;
  
//     if (country) {
//       changeableUrl = `${url}/countries/${country}`;
//     }
  
//     try {
//       const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
  
//       return { confirmed, recovered, deaths, lastUpdate };
//     } catch (error) {
//       return error;
//     }
//   }