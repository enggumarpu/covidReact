import React, { useContext } from 'react';
import StateContext from '../ContextFolder/StateContext';
import {Line} from 'react-chartjs-2';

function GlobalChart(props) {
    const {  dailyData, loadingDaily} = useContext(StateContext);
    console.log('dailydata*****', dailyData);
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '500px'}}>
        {loadingDaily && <Line 
                data={{
                    labels: dailyData.map((item, index) => {
                        return item.reportDate
                    }),
                    datasets:[{
                        label:'Infected',
                        data: dailyData.map((item, index) => {
                            return item.confirmed.total;
                        }),
                        borderColor: '#3333ff',
                        fill: true
                    },{
                        label:'Deaths',
                        data: dailyData.map((item, index) => {
                            return item.deaths.total;
                        }),
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'red',
                        fill: true
                    }]
                }}
                options = {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    return value / 1e6 + 'M';
                                },
                                scaleLabel: {
                                display: true,
                                labelString: 'Revenues (U$)'
                              }
                            }
                            
                        }]
                    }
                   }}
        
        
        
        
        
        
        />}     
        </div>
    );
}

export default GlobalChart;