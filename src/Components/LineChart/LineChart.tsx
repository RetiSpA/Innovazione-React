
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import * as $ from 'jquery';
var echarts = require('echarts');

export interface LineChartProps {
}
export interface LineChartState {
    chartData: number[];
}

export class LineChart extends React.Component<LineChartProps, LineChartState> {

    public myChart: any = null
    constructor(prop: LineChartProps, state: LineChartState) {
        super(prop, state);

        this.state = {
            chartData: []
        }
    }

    componentDidMount() {

        $.ajax({
            url: 'https://httpbin.org/get'
        }).done((reply) => {

            const data = []
            for (var i = 0; i < 12; i++) {
                data.push(Math.random() * 1000);
            }

            this.setState({
                chartData: data
            })
            this.createChart();

        })
            .fail(() => {
                console.log('errore');
            })
    }

    //when data updates re-create graph
    componentWillUpdate(){
        this.createChart()
    }

    //check if re-render components
    shouldComponentUpdate(nextProps:LineChartProps,nextState:LineChartState){
        let mustUpdate=false;
        nextState.chartData.forEach((item,index)=>{

            if(item!= this.state.chartData[index])
                mustUpdate= true
        })

        return mustUpdate;
    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        this.myChart.dispose();
    }
    
    createChart() {
        if (this.myChart != null)
            this.myChart.dispose();

        const el = findDOMNode(this.refs.graph);
        $(el).addClass('ciao');
        // initialize echarts instance with prepared DOM
        this.myChart = echarts.init(el);
        // draw chart
        // specify chart configuration item and data
        const option = {
            xAxis: {
                type: 'category',
                data: [
                    'January'
                    , 'February'
                    , 'March'
                    , 'April'
                    , 'May'
                    , 'June'
                    , 'July'
                    , 'August'
                    , 'September'
                    , 'October'
                    , 'November'
                    , 'December'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.chartData,
                type: 'line'
            }]
        };
        // use configuration item and data specified to show chart
        this.myChart.setOption(option);

    }


    refreshDataChart() {

        $.ajax({
            url: 'https://httpbin.org/get'
        }).done((reply) => {

            const data = []
            for (var i = 0; i < 12; i++) {
                data.push(Math.random() * 1000);
            }

            this.setState({
                chartData: data
            })

        })
            .fail(() => {
                console.log('errore');
            })

    }


    render() {

        return (<div>
            <h3>Prenotation in months</h3>
            <button className="btn btn-primary" onClick={(e) => this.refreshDataChart()}> RefreshDate</button>
            <span> 
                <label>This components use shouldComponentUpdate to check if update or not the components when parents is update</label>
            </span> 
            <div ref="graph" style={{ height: '100%', width: '100%', minHeight: '400px' }}>

            </div>
        </div>
        )
    }

}