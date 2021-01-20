import React, {useContext} from 'react';
import {Grid, Typography, Paper, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../ContextFolder/StateContext';
import CountryPicker from './CountryPicker';
import {CircularProgress} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
      },
      totalConfirmed: {
        textAlign: "center",
        // color: theme.palette.text.secondary,
        color: "white",
        backgroundColor: "rgba(255,0,0,0.6)",
  
      },
      totalRecovered: {
        textAlign: "center",
        backgroundColor: "#005d66",
        color: "#81f9dc",
       
      },
      totalDeaths: {
        textAlign: "center",
        backgroundColor: "#daece5",
      },
      formControl: {
        maxWidth: "95%",
        margin: "0 auto",
      },
      cardStyle:{
        margin: '10px'
      }
    }));


function CovidSidebar(props) {
const { covidData, loading } = useContext(StateContext);
const classes = useStyles();
//console.log('loading value in sidebar', covidData);

    return (
      <>
      {/* {loading ? (<div></div>) : <CircularProgress color="secondary" /> } */}
      
          <div>
          <Grid container xs={12} sm={12} md={12} spacing={0} 
              justify="center"
              style={{maxWidth: "90%",margin: "0 auto",}}> 
                 {/* Confirmed Cases Global */}
                 <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h3" align="center">Global</Typography>
              </Grid>
                 <Grid item xs={12} sm={12} md={12}>
                   <Paper className={classes.totalConfirmed}>
                     <Typography variant="h5">Total Confirmed</Typography>
                     { 
                       <Typography variant="h3" style={{ fontWeight: "bold" }}>
                         {covidData.cases.toLocaleString()}
                       </Typography>
                     }
                   </Paper>
                 </Grid>
               {/* Recovered Cases Global */}
                 <Grid item xs={12} sm={6} md={6}>
                   <Paper className={classes.totalRecovered}>
                     <Typography variant="h5" style={{ color: "white" }}>
                       Total Recovered
                     </Typography>
                     {
                       <Typography
                         variant="h3"
                         style={{
                           fontWeight: "bold",
                           textAlign: "center",
                           fontSize: "2.5rem",
                         }}
                       >
                         {covidData.recovered.toLocaleString()}
                       </Typography>
                     }
                   </Paper>
                 </Grid>
                 <Grid item xs={12} sm={6} md={6}>
                   <Paper className={classes.totalDeaths}>
                     <Typography variant="h5">Total Deaths</Typography>
                     {
                       <Typography
                         variant="h3"
                         style={{ fontWeight: "bold", fontSize: "2.5rem" }}
                       >
                         {covidData.deaths.toLocaleString()}
                       </Typography>
                     }
                   </Paper>
                 </Grid>
                 {/* Selectionbox Country Picker Cases Global */}
                 <Grid item xs={12} sm={12} md={12} className={classes.formControl}>
                   <CountryPicker />
                 </Grid>
               </Grid>
               
        </div>
        
      
       </>
    );
  
}

export default CovidSidebar;






           