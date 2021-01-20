import React, {useContext} from 'react';
import {Bar} from 'react-chartjs-2';
import StateContext from '../ContextFolder/StateContext';




const CovidChartJs = () =>  {

    const { singleCountry, countryName } = useContext(StateContext);
    console.log('country data', singleCountry)    
    const state = {
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [singleCountry.cases, singleCountry.recovered, singleCountry.deaths]    
          },
          
        ]
      }







    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:`${countryName} COVID-19 Stats`,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
export default CovidChartJs;