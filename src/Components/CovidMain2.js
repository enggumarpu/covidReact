


import React, {useContext}from 'react';
import {Grid, Typography, Card, CardContent } from '@material-ui/core';
import StateContext from '../ContextFolder/StateContext';
import CovidChartJs from './CovidChart';
import GlobalChart from './GlobalChart';



function CovidMain(props) {
    const { covidData, loading, singleCountry, countryName } = useContext(StateContext);
    //console.log('insided main', singleCountry)
    console.log('countryName', countryName)
    return (
        <div style={{border: '1px solid red'}}>
              <Grid container xs={12} sm={12} md={12} spacing={0} justify="center">
              {/* Card Confirmed */}
              <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h4" align="center">{countryName}</Typography>
              </Grid>
                <Grid item xs={12} sm={12} md={3} component={Card}  
                style={{border: "2px solid rgba(255,0,0,0.6)"}}>
                  <CardContent>
                    <Typography variant="h5" style={{color: '#ff0000'}}>Confirmed</Typography>
                    { <Typography variant="h3">{singleCountry.cases.toLocaleString()}</Typography> }
                    {  <Typography variant="h6">Today: {singleCountry.todayCases.toLocaleString()}</Typography> }
                    {  <Typography>{new Date(parseInt(singleCountry.updated)).
                    toLocaleString('en-US', { timeZone: 'Europe/Helsinki', dateStyle: 'long' })}</Typography> } 
                  </CardContent>
                </Grid>
                {/* Card Recovered */}
                <Grid item xs={12} sm={12} md={3} component={Card} 
                style={{border: "2px solid #005d66"}}>
                <CardContent>
                    <Typography variant="h5" style={{color: '#005d66'}}>Recovered</Typography>
                    { <Typography variant="h3">{singleCountry.recovered.toLocaleString()}</Typography> }
                  </CardContent>
                </Grid>
                {/* Card Deaths*/}
                <Grid item xs={12} sm={12} md={3} component={Card} 
                style={{border: "2px solid #daece5"}}>
                <CardContent>
                    <Typography variant="h5" style={{color: '#daece5'}}>Deaths</Typography>
                    { <Typography variant="h3">{singleCountry.deaths.toLocaleString()}</Typography> }
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={12} md={11}><CovidChartJs /></Grid>
                <Grid item xs={12} sm={12} md={11}><GlobalChart /></Grid>

              </Grid>   
              
        </div>
    );
}

export default CovidMain;




//covidmap short 
import React, {useContext}from 'react';
import {Grid, Typography, Card, CardContent } from '@material-ui/core';
import StateContext from '../ContextFolder/StateContext';
// import CovidChartJs from './CovidChart';
// import GlobalChart from './GlobalChart';
import MapChart from './CovidMap';



function CovidMain(props) {
    const { covidData, loading, singleCountry, countryName } = useContext(StateContext);
    //console.log('insided main', singleCountry)
    console.log('countryName', countryName)
    return (
        <div style={{border: '1px solid red'}}>
                
              <MapChart />
        </div>
    );
}

export default CovidMain;
///covid map fucntion 
import React,{useEffect, useContext, useRef} from 'react';
import StateContext from '../ContextFolder/StateContext';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function MapChart(props) {
  const {countriesData, loadingCountries} = useContext(StateContext);
  let chartComponent = useRef();
  useEffect(()=>{

    let chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.seriesContainer.background.fill = am4core.color("#ffffff")

    // Set map definition
    chart.geodataSource.url =
      "https://www.amcharts.com/lib/4/geodata/json/worldLow.json";
    chart.geodataSource.events.on("parseended", function (event) {
      let data = [];
      let data1 = [];
      let markers = [];

      countriesData.map((country) => {
        data1.push({
          id: country.countryInfo.iso2,
        //   value: { confirmed: country.confirmed, recovered: country.recovered, 
        //            deaths: country.deaths, active: country.active },
        value: country.cases
         });
        markers.push({
          
          id: country.countryInfo.iso2,
          title: country.country,
          confirmed: country.cases,
          active: country.active,
          recovered: country.recovered,
          deaths: country.deaths,
          latitude: country.countryInfo.lat,
          longitude: country.countryInfo.long,

        });
      });
      // for (var i = 0; i < event.target.data.features.length; i++) {
      //   data.push({
      //     id: event.target.data.features[i].id,
      //     value: something[12].cases,
      //   });
      // }
      //console.log("data", data);
      //console.log("dtata", data1);
      polygonSeries.data = data1;
      imageSeries.data = markers;
    });

    // Set projection
    chart.projection = new am4maps.projections.Miller();
  

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 1;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 1.0;

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.exclude = ["AQ"];
   

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.propertyFields.id = "id";

    
    // polygonSeries.heatRules.push({
    //   "property": "fill",
    //   "target": polygonSeries.mapPolygons.template,
    //   "min": am4core.color("#ffffff"),
    //   "max": am4core.color("#AAAA00")
    // });

    //polygonTemplate.tooltipHTML = `{name} <br> <span>Active:<b>{value.active}</b>`;
    polygonTemplate.fill = am4core.color("#d6e7ea");

    //polygonSeries.mapPolygons.template.tooltipPosition = "fixed";
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Create active state
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = chart.colors.getIndex(1);

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", function (event) {
      event.target.isActive = !event.target.isActive;
    });

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    let imageSeriesTemplate = imageSeries.mapImages.template;
   
    
    imageSeries.tooltip.showInViewport = false;
    imageSeries.tooltip.fontSize = 10;
    imageSeries.tooltip.paddingBottom = 30;  
    imageSeries.tooltip.background.fillOpacity = 1.0;
    imageSeries.tooltip.getStrokeFromObject = false;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.background.fill = am4core.color("#00272b");


    imageSeriesTemplate.tooltipPosition = "fixed";
    imageSeriesTemplate.tooltipHTML = `<div class="tooltip">
                                         <b>{title}</b><br>
                              <span>Confirmed:<b class = tooltip__conf> {confirmed}</b></span><br>
                              <span>Active:<b class = tooltip__act> {active}</b></span><br>
                              <span>Recovered:<b class = tooltip__rec> {recovered}</b></span><br>
                              <span>Deaths:<b class = tooltip__deaths> {deaths}</b></span><br></div>`;
                              
    imageSeries.dataFields.id = "id";
    imageSeries.dataFields.value = "active";                                    
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    // if (imageSeries){
    //   console.log('image pk', imageSeries);
    // }

    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    //circle.radius = 4;
    //circle.stroke = am4core.color("#FFFFFF");
    //circle.strokeWidth = 2;
    circle.fill = am4core.color("#ff0000");
    circle.fillOpacity = 0.5
    circle.nonScaling = true;
    circle.tooltipText = "{title}";
    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 3,
      "max": 30,
      "dataField": "value"
    })
    // var heatLegend = chart.createChild(am4maps.HeatLegend);
    //   heatLegend.series = polygonSeries;
    //   heatLegend.width = am4core.percent(100);

    //   polygonSeries.mapPolygons.template.events.on("over", function(ev) {
    //     if (!isNaN(ev.target.dataItem.value)) {
    //       heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
    //     }
    //     else {
    //       heatLegend.valueAxis.hideTooltip();
    //     }
    //   });

    //   polygonSeries.mapPolygons.template.events.on("out", function(ev) {
    //     heatLegend.valueAxis.hideTooltip();
    //   });

    
    chartComponent.current = chart;
    chart.events.on("ready", triggerPK);
    chart.dispose();
    
  }, []);
  // function triggerTooltip(code) {
  //   // let imagesLe = this.chart._series._values[1]._mapImages._values.length;
  //   let imageFind, polygonFind;
  //   chartComponent.current._series._values[0]._mapPolygons._values.forEach((image, inde) => {
  //     if (image._dataItem._dataContext.id === code) {
  //        polygonFind = image;
  //     }
    
  // });
  // chartComponent.current._series._values[1]._mapImages._values.forEach((image) => {
  //     if (image._dataItem._dataContext.id === code) {
  //       imageFind = image;
  //     }
  //   });
  //   console.log('whole chart', this.chart);

  //   //polygonFind.isHover = polygonFind.isHover ? false : true;
  //   imageFind.isHover = imageFind.isHover ? false :true 
  // }
  function triggerPK(){
    
    //  if(this.state.loading){
    //   console.log('this is triggered');
    // let imagePK;
    // chart._series._values[1]._mapImages._values.forEach((image) => {
    //   if (image._dataItem._dataContext.id === 'PK') {
    //     imagePK = image;
    //     console.log('image of pk', imagePK)
    //   }
    // });
    // imagePK.isHover = true;
    // }
    console.log('chart component', chartComponent);
    console.log('trigger Pk called');
  }
    return (
        <div>
            <div id="chartdiv" style={{ width: "100%", height: "750px" }}></div>
        <button onClick={() => this.triggerTooltip("AF")}>Hello</button>
        <a href="_blank" onMouseEnter={() => this.triggerTooltip("AF")} 
            onMouseLeave={() => this.triggerTooltip("AF")}>Click</a>
        </div>
    );
}

export default MapChart;







///covid map


import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {fetchingCouData} from '../ApiCall';


// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesData: [],
      countryCode: "US",
      loading: false
    };
    
    
    this.triggerTooltip = this.triggerTooltip.bind(this);
    this.triggerPK = this.triggerPK.bind(this);
    let button = React.createRef();
  }
  async componentDidMount() {
    // Create map instance
    const something = await fetchingCouData('');
    this.setState({ countriesData:something, loading: true });

    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.seriesContainer.background.fill = am4core.color("#ffffff")

    // Set map definition
    chart.geodataSource.url =
      "https://www.amcharts.com/lib/4/geodata/json/worldLow.json";
    chart.geodataSource.events.on("parseended", function (event) {
      let data = [];
      let data1 = [];
      let markers = [];

      something.map((country) => {
        data1.push({
          id: country.countryInfo.iso2,
        //   value: { confirmed: country.confirmed, recovered: country.recovered, 
        //            deaths: country.deaths, active: country.active },
        value: country.cases
         });
        markers.push({
          
          id: country.countryInfo.iso2,
          title: country.country,
          confirmed: country.cases,
          active: country.active,
          recovered: country.recovered,
          deaths: country.deaths,
          latitude: country.countryInfo.lat,
          longitude: country.countryInfo.long,

        });
      });
      for (var i = 0; i < event.target.data.features.length; i++) {
        data.push({
          id: event.target.data.features[i].id,
          value: something[12].cases,
        });
      }
      //console.log("data", data);
      //console.log("dtata", data1);
      polygonSeries.data = data1;
      imageSeries.data = markers;
    });

    // Set projection
    chart.projection = new am4maps.projections.Miller();
  

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 1;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 1.0;

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.exclude = ["AQ"];
   

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.propertyFields.id = "id";

    
    // polygonSeries.heatRules.push({
    //   "property": "fill",
    //   "target": polygonSeries.mapPolygons.template,
    //   "min": am4core.color("#ffffff"),
    //   "max": am4core.color("#AAAA00")
    // });

    //polygonTemplate.tooltipHTML = `{name} <br> <span>Active:<b>{value.active}</b>`;
    polygonTemplate.fill = am4core.color("#d6e7ea");

    //polygonSeries.mapPolygons.template.tooltipPosition = "fixed";
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Create active state
    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = chart.colors.getIndex(1);

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", function (event) {
      event.target.isActive = !event.target.isActive;
    });

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    let imageSeriesTemplate = imageSeries.mapImages.template;
   
    
    imageSeries.tooltip.showInViewport = false;
    imageSeries.tooltip.fontSize = 10;
    imageSeries.tooltip.paddingBottom = 30;  
    imageSeries.tooltip.background.fillOpacity = 1.0;
    imageSeries.tooltip.getStrokeFromObject = false;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.background.fill = am4core.color("#00272b");


    imageSeriesTemplate.tooltipPosition = "fixed";
    imageSeriesTemplate.tooltipHTML = `<div class="tooltip">
                                         <b>{title}</b><br>
                              <span>Confirmed:<b class = tooltip__conf> {confirmed}</b></span><br>
                              <span>Active:<b class = tooltip__act> {active}</b></span><br>
                              <span>Recovered:<b class = tooltip__rec> {recovered}</b></span><br>
                              <span>Deaths:<b class = tooltip__deaths> {deaths}</b></span><br></div>`;
                              
    imageSeries.dataFields.id = "id";
    imageSeries.dataFields.value = "active";                                    
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    if (imageSeries){
      console.log('image pk', imageSeries);
    }

    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    //circle.radius = 4;
    //circle.stroke = am4core.color("#FFFFFF");
    //circle.strokeWidth = 2;
    circle.fill = am4core.color("#ff0000");
    circle.fillOpacity = 0.5
    circle.nonScaling = true;
    circle.tooltipText = "{title}";
    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 3,
      "max": 30,
      "dataField": "value"
    })
    // var heatLegend = chart.createChild(am4maps.HeatLegend);
    //   heatLegend.series = polygonSeries;
    //   heatLegend.width = am4core.percent(100);

    //   polygonSeries.mapPolygons.template.events.on("over", function(ev) {
    //     if (!isNaN(ev.target.dataItem.value)) {
    //       heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
    //     }
    //     else {
    //       heatLegend.valueAxis.hideTooltip();
    //     }
    //   });

    //   polygonSeries.mapPolygons.template.events.on("out", function(ev) {
    //     heatLegend.valueAxis.hideTooltip();
    //   });

    
    this.chart = chart;
    this.chart.events.on("ready", this.triggerPK)
  
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  triggerTooltip(code) {
    // let imagesLe = this.chart._series._values[1]._mapImages._values.length;
    let imageFind, polygonFind;
    this.chart._series._values[0]._mapPolygons._values.forEach((image, inde) => {
      if (image._dataItem._dataContext.id === code) {
         polygonFind = image;
      }
    
  });
    this.chart._series._values[1]._mapImages._values.forEach((image) => {
      if (image._dataItem._dataContext.id === code) {
        imageFind = image;
      }
    });
    console.log('whole chart', this.chart);

    //polygonFind.isHover = polygonFind.isHover ? false : true;
    imageFind.isHover = imageFind.isHover ? false :true 
  }
  triggerPK(){
    
    let imagePK;
    if (this.state.loading) {
      console.log("this is triggered");
      this.chart._series._values[1]._mapImages._values.forEach((image) => {
        if (image._dataItem._dataContext.id === "PK") {
          imagePK = image;
          console.log("image of pk", imagePK);
        }
      });
    }
    imagePK.isHover = true;
  }
  componentDidUpdate(prevStat, pS) {
   
  }
  render() {
    return (
      <div>
        <div id="chartdiv" style={{ width: "100%", height: "750px" }}></div>
        <button onClick={() => this.triggerTooltip("AF")}>Hello</button>
        <a href="_blank" onMouseEnter={() => this.triggerTooltip("AF")} 
            onMouseLeave={() => this.triggerTooltip("AF")}>Click</a>
            
      </div>
    );
  }
}

export default MapChart;
           



           