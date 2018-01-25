
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import * as $ from 'jquery';
var echarts = require('echarts');

export interface DoughnutChartProps{
   data:number[];
}

export interface DoughnutChartState {

}

export class DoughnutChart extends React.Component<DoughnutChartProps, DoughnutChartState> {

    public myChart:any=null
    public chartData:number[]=null

    constructor(props: DoughnutChartProps, state: DoughnutChartState) {
        super(props, state);
        
        this.chartData=props.data;
    }

    componentDidMount() {

       /* $.ajax({
            url: 'https://httpbin.org/get'
        }).done((reply) => {

            const data = []
            for (var i = 0; i < 5; i++) {
                data.push(Math.random() * 1000);
            }

            this.setState({
                chartData: data
            })
            this.createChart();

        })
            .fail(() => {
                console.log('errore');
            })*/
            this.createChart();
    }

    componentWillReceiveProps(nextProp:DoughnutChartProps){
        this.chartData=nextProp.data
        
    }

     //Destroy chart before unmount.
    componentWillUnmount() {
        this.myChart.dispose();
    }

    //when data updates re-create graph
    componentWillUpdate(nextProp:DoughnutChartProps){
        this.createChart()
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['500C','Ferrari','Punto','Renault','Chevrolet']
            },
            series: [
                {
                    name:'Use of cars',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:this.chartData[0], name:'500C'},
                        {value:this.chartData[1], name:'Ferrari'},
                        {value:this.chartData[2], name:'Punto'},
                        {value:this.chartData[3], name:'Renault'},
                        {value:this.chartData[4], name:'Chevrolet'}
                    ]
                }
            ]
        };
        // use configuration item and data specified to show chart
        this.myChart.setOption(option);

    }


    render() {

        return (<div>
            <h3>Prenotation by Cars</h3>
            <span> 
                <label>This components use data from parents</label>
            </span> 
            <div ref="graph" style={{ height: '100%', width:'100%',minHeight:'400px' }}>

            </div>
        </div>
        )
    }

}