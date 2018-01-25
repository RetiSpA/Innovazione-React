
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import * as $ from 'jquery';
var echarts = require('echarts');

export interface GraphDemoProps{
}
export interface GraphDemoState {
}

export class GraphDemo extends React.Component<GraphDemoProps, GraphDemoState> {

    public myChart:any=null
    constructor(prop: GraphDemoProps, state: GraphDemoState) {
        super(prop, state);

    }

    componentDidMount() {

        const el = findDOMNode(this.refs.graph);
        $(el).addClass('ciao');
        // initialize echarts instance with prepared DOM
        this.myChart = echarts.init(el);
        // draw chart
        // specify chart configuration item and data
        var option = {
            title: {
                text: 'ECharts entry example'
            },
            tooltip: {},
            legend: {
                data:['Sales']
            },
            xAxis: {
                data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // use configuration item and data specified to show chart
        this.myChart.setOption(option);
    }

     //Destroy chart before unmount.
     componentWillUnmount() {
        this.myChart.destroy();
    }

    render() {

        return (<div>
            <h1>Demo Graph</h1>
            <div ref="graph" style={{ height: '800px', width:'800px' }}>

            </div>
        </div>
        )
    }

}