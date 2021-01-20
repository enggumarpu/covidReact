import React, { useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import StateContext from './ContextFolder/StateContext';
import DispatchContext from './ContextFolder/DispatchContext';
import axios from 'axios';
import {fetchingGlobal, fetchingCouData, fetchingDailyData} from './ApiCall';
import CovidMain from './Components/CovidMain';
import CovidSidebar from './Components/CovidSidebar';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core'
import theme from '@amcharts/amcharts4/themes/animated';

let initialState = {
  loadingGlobal: false,
  loadingCountries: false,
  loadingSingle: false,
  loadingDaily: false,
  covidData: {},
  countriesData: [],
  singleCountry: {},
  dailyData: [],
  countryName: "Pakistan",
  error: '',
  name: 'Umar'
};
const names = ['James', 'John', 'Paul', 'Ringo', 'George'];
const globalDataReducer = (state, action) => {
  
  switch (action.type) {
      case 'GLOBAL':
       return {
         ...state,
         covidData: action.payload,
         loadingGlobal: true,
         error: '<h1>Something went wrong</h1>',
         countryName: 'Pakistan'
       }
       case 'COUNTRIES':
       return {
         ...state,
         countriesData: action.payload,
         loadingCountries: true,
         error: '<h1>Something went wrong</h1>'
       }
       case 'SINGLE':
       return {
         ...state,
         countryName: action.name,
         singleCountry: action.payload,
         loadingSingle: true,
         error: '<h1>Something went wrong</h1>'
       }
       case 'DAILY':
       return {
         ...state,
         dailyData: action.payload,
         loadingDaily: true,
         error: '<h1>Something went wrong</h1>'
       }
      case 'ERROR':
       return {
         loadingGlobal: false,
         covidData: {},
         countryName: 'Pakistan',
         error: '<h1>Something went wrong</h1>'
        }  
      default:
        break;
    }
    //console.log('Reducer called', state);
}

function App() {



  useEffect(() => {
    fetchGlobalData();
    //countriesData();
  },[])
  const [state, dispatch] = useReducer(globalDataReducer, initialState);

  const fetchGlobalData = async () => {
    const globalData = await fetchingGlobal().then((response)=>{
      dispatch({type: 'GLOBAL', payload: response })
    })
    .catch((error)=>{
      dispatch({type: 'ERROR', payload: error});
    })
    const countryData = await fetchingCouData('').then((response)=>{
      dispatch({type: 'COUNTRIES', payload: response })
    })
    .catch((error)=>{
      dispatch({type: 'ERROR', payload: error});
    })
    const countriesData = await fetchingCouData('Pakistan').then((response)=>{
      dispatch({type: 'SINGLE', payload: response, name: 'Pakistan' })
    })
    .catch((error)=>{
      dispatch({type: 'ERROR', payload: error});
    })
    const dailData = await fetchingDailyData().then((response)=>{
      dispatch({type: 'DAILY', payload: response })
    })
    .catch((error)=>{
      dispatch({type: 'ERROR', payload: error});
    })

    
}
  
  const handleSelection = async (count) =>{

    let countryN = count !== undefined ? count: 'Pakistan';
      console.log('country selected', count);
    const countryData = await fetchingCouData(count).then((response)=>{
      dispatch({type: 'SINGLE', payload: response, name: count })
    })
    .catch((error)=>{
      dispatch({type: 'ERROR', payload: error});
    })

  } 
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  return (
    <>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <MuiThemeProvider theme={theme}>
        <h1 style={{ textAlign: "center" }}>Covid Tracker App</h1>
        {state.loadingDaily ? (
          <header className="">
            <StateContext.Provider value={state}>
              <DispatchContext.Provider value={handleSelection}>
                {/* {state.loadingGlobal && <GlobalChart />}   */}
                <div className="layout">
                  <aside className="layout__sidebar">
                    {state.loadingGlobal && <CovidSidebar />}
                  </aside>
                  <section className="layout__main">
                    {state.loadingSingle && <CovidMain />}
                  </section>

                  {console.log("Single Country*****", state.singleCountry)}
                  {console.log("Single Country Name*****", state.countryName)}
                  {/* {console.log('Single dailydata*****', state.dailyData)}  */}
                </div>
                {/* <section>{<GlobalChart /> }</section> */}
              </DispatchContext.Provider>
            </StateContext.Provider>
            {/* <h1>Hello World!{state.dailyData.totalConfirmed}</h1>
        {state.loadingDaily && <GlobalChart />}   */}
          </header>
        ) : (
          <CircularProgress color="secondary" className="circularPro" />
        )}
        </MuiThemeProvider>
      </div>
    </>
  );
}

export default App;
