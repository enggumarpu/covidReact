import React, { useState, useEffect, useContext } from 'react';
import { ListItemIcon, ListItemText, List, ListItem, Grid, Typography, Paper } from '@material-ui/core';
//import { fetchCountries } from './ApiCall';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import StateContext from '../ContextFolder/StateContext';
import { display } from '@material-ui/system';
import axios from 'axios';
import DispatchContext from '../ContextFolder/DispatchContext';
import  {FormControl, NativeSelect, InputBase, Divider, IconButton} from '@material-ui/core';
import CustomizedInputBase from './CovidSearch';
import triggerPK from './CovidMap';
import MapChart from './CovidMap';
import triggerTooltip from './CovidMap';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const CountryPicker = () => {
  //const [countries, setCountries] = useState([]);
  //const [searchedCountries, setsearchedCountries] = useState([]);
  
  //const [loading, setLoading] = useState(false);
  const [selectionCN, setCountry] = useState('Pakistan');
  const [searchText, setsearchText] = useState('');
  
  const {countriesData, loadingCountries} = useContext(StateContext);

  const  handleSelction  = useContext(DispatchContext);
  const classes = useStyles();
  const MapChartObj = new MapChart();


  //let resultCou = [];

  
  // useEffect(() => {

  //   const fetchAPI = async () => {
  //     const  data  = axios.get('https://disease.sh/v2/countries?sort=cases').then(response => {
  //       // do stuff
  //       console.log('country picker countries', response.data);
  //       setCountries(response.data)
  //       setLoading(true);
  //       })
  //       .catch(error => {
  //       // what now
  //       console.log('error', error);
  //       //dispatch({type: 'ERROR', payload: error})
  //   })
  // };
  //   fetchAPI();
    
  // }, []);
  
  const onChangeSelection = (e) => {
        setCountry(e.target.value);
        handleSelction (e.target.value);
  }
  const searchedFunction = (e) => {

     const text = e.target.value;
  //   const searchedData = countries.filter((item, i) => {
  //   const lowerItem = item.country.toLowerCase();
  //   const lowerText = searchText.toLowerCase();
  //   return lowerItem.substring(0, lowerText.length).indexOf(lowerText) !== -1;
    
  // })
     //setsearchedCountries(searchedData);
     setsearchText(text);
    
   }
  //resultCou = searchText ? searchedCountries : countries;
   return (
     <>
       {loadingCountries && (
         <>
           <div className="countriesList">
             {/* <h3>Coutries List</h3> */}
             <Typography variant="h6" spacing={2}>
               Confirmed Cases
             </Typography>
             {/* <div style={{ display: "flex", justifyContent: "center" }}>

             <SearchIcon style={{color: '#115293'}} />
               <TextField
                 variant="standard"
                 placeholder="Search Country"
                 fullWidth
                 style={{background: 'white', outline:'none', border: 'none'}}
                 InputLabelProps={{ shrink: true }}
                 onChange={searchedFunction}
               />
               
             </div> */}
             <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Country"
                   onChange={searchedFunction}
                />
                {/* <Divider className={classes.divider} orientation="vertical" />
                <SearchIcon /> */}
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton disabled className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>

              </Paper>

             <Grid item md={12}>
               <List
                 style={{maxHeight: '25vw', overflow: 'auto'}} 
                 fullwidth={true}
               >
                 {/* {maxHeight: 400} */}
                 {/* {countries.filter((item, i) => ( <ListItem>{item.country}</ListItem> ))} */}
                 {countriesData
                   .filter((item) =>
                     item.country
                       .toLowerCase()
                       .substring(0, searchText.length)
                       .includes(searchText.toLowerCase())
                   )
                   .map((filterName, i) => (
                     <ListItem
                       key={i}
                       divider
                       button
                       onClick={() => {
                         handleSelction(filterName.country);
                       }}
                       value={filterName.country}
                       className={classes.listItem}
                     >
                       <ListItemIcon>
                         <img
                           src={filterName.countryInfo.flag}
                           width="50px"
                           height="33px"
                           alt={filterName.country}
                         />
                       </ListItemIcon>
                       <ListItemText style={{ margin: "0 20px" }}>
                         {parseInt(filterName.cases).toLocaleString()}
                       </ListItemText>
                       <ListItemText style={{ textAlign: "left" }}>
                         {filterName.country}
                       </ListItemText>
                     </ListItem>
                   ))}
               </List>
             </Grid>
           </div>
           <div className="countriesSelection" style={{margin: '20px 0'}}>
             <FormControl fullWidth={true}>
               <NativeSelect value={selectionCN} onChange={onChangeSelection}>
                 {/* <option value="Pakistan">Pakistan</option> */}
                 {countriesData.map((country) => (
                   <option value={country.country}>{country.country}</option>
                 ))}
               </NativeSelect>
             </FormControl>
           </div>
         </>
       )}
     </>
   );
};

export default CountryPicker;