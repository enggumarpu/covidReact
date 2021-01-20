import React, {useContext}from 'react';
import {Grid, Typography, Card, CardContent } from '@material-ui/core';
import StateContext from '../ContextFolder/StateContext';
 import CovidChartJs from './CovidChart';
 import GlobalChart from './GlobalChart';
import MapChart from './CovidMap';



function CovidMain(props) {
    const { covidData, loading, singleCountry, countryName } = useContext(StateContext);
    //console.log('insided main', singleCountry)
    console.log('countryName', countryName)
    return (
        <div>
        <Grid container xs={12} sm={12} md={12} spacing={0} justify="center">
        {/* Card Confirmed */}
        <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h4" align="center">{countryName}</Typography>
        </Grid>
          <Grid item xs={12} sm={12} md={3} component={Card}  
          style={{border: "2px solid rgba(255,0,0,0.6)"}}>
            <CardContent>
              <Typography variant="h5" style={{color: '#ff0000'}}>Confirmed</Typography>
               <Typography variant="h3">{singleCountry.cases.toLocaleString()}</Typography> 
                <Typography variant="h6">Today: {singleCountry.todayCases.toLocaleString()}</Typography> 
                <Typography>{new Date(parseInt(singleCountry.updated)).
              toLocaleString('en-US', { timeZone: 'Europe/Helsinki', dateStyle: 'long' })}</Typography>  
            </CardContent>
          </Grid>
          {/* Card Recovered */}
          <Grid item xs={12} sm={12} md={3} component={Card} 
          style={{border: "2px solid #005d66"}}>
          <CardContent>
              <Typography variant="h5" style={{color: '#005d66'}}>Recovered</Typography>
              <Typography variant="h3">{singleCountry.recovered.toLocaleString()}</Typography>
              <Typography variant="h6">Today: {singleCountry.todayRecovered.toLocaleString()}</Typography> 
                <Typography>{new Date(parseInt(singleCountry.updated)).
              toLocaleString('en-US', { timeZone: 'Europe/Helsinki', dateStyle: 'long' })}</Typography> 
            </CardContent>
          </Grid>
          {/* Card Deaths*/}
          <Grid item xs={12} sm={12} md={3} component={Card} 
          style={{border: "2px solid #daece5"}}>
          <CardContent>
              <Typography variant="h5" style={{color: '#daece5'}}>Deaths</Typography>
               <Typography variant="h3">{singleCountry.deaths.toLocaleString()}</Typography>
               <Typography variant="h6">Today: {singleCountry.todayDeaths.toLocaleString()}</Typography> 
                <Typography>{new Date(parseInt(singleCountry.updated)).
              toLocaleString('en-US', { timeZone: 'Europe/Helsinki', dateStyle: 'long' })}</Typography> 
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={12} md={11}><CovidChartJs /></Grid>
          {/* <Grid item xs={12} sm={12} md={11}><GlobalChart /></Grid> */}

        </Grid>   
        
  </div>
    );
}

export default CovidMain;