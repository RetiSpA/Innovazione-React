import * as React from 'react';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart';
import { LineChart } from '../LineChart/LineChart'
import { BarChart } from '../BarChart/BarChart'

import * as $ from 'jquery';

export interface InfoProps {

}
export interface InfoState {
  doughnutData: any[]
}

export class Info extends React.Component<InfoProps, InfoState> {

  public doughnutData: number[] = []
  constructor(prop: InfoProps, state: InfoState) {
    super(prop, state);
    this.state = {
      doughnutData: [100, 300, 400, 500, 600]

    }
  }

  refreshDataChart() {

    var self = this;
    $.ajax({
      url: 'https://httpbin.org/get'
    }).done((reply) => {

      const data = []
      for (var i = 0; i < 5; i++) {
        data.push(Math.random() * 1000);
      }

      self.setState({
        doughnutData: data
      })

    })
      .fail(() => {
        console.log('errore');
      })

  }
  render() {

    return (
      <section className="clearfix g-brd-bottom g-brd-gray-light-v4">
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={(e) => this.refreshDataChart()}> Refresh Parent</button>
            <DoughnutChart data={this.state.doughnutData}></DoughnutChart>
          </div>
          <div className="col-md-4">
            <LineChart></LineChart>
          </div>
          <div className="col-md-4">
            <BarChart></BarChart>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-md-6 col-lg-3 g-brd-right--md g-brd-gray-light-v4">

            <div className="text-center g-py-20">
              <span className="u-icon-v1 u-icon-size--xl g-color-black g-mb-10">
                <i className="fa fa-map-marker"></i>
              </span>
              <h4 className="h5 g-font-weight-600 g-mb-5">Address</h4>
              <span className="d-block">Via Dante, 6, 21052 Busto Arsizio (VA)</span>
            </div>

          </div>

          <div className="col-md-6 col-lg-3 g-brd-right--md g-brd-gray-light-v4">

            <div className="text-center g-py-20">
              <span className="u-icon-v1 u-icon-size--xl g-color-black g-mb-10">
                <i className="fa fa-phone"></i>
              </span>
              <h4 className="h5 g-font-weight-600 g-mb-5">Phone Number</h4>
              <span className="d-block">
                Tel: +39.0331.357.400 <br />
                Fax: +39.0331.622.869
            </span>
            </div>

          </div>

          <div className="col-md-6 col-lg-3 g-brd-right--md g-brd-gray-light-v4">

            <div className="text-center g-py-20">
              <span className="u-icon-v1 u-icon-size--xl g-color-black g-mb-10">
                <i className="fa fa-envelope"></i>
              </span>
              <h4 className="h5 g-font-weight-600 g-mb-5">Email</h4>
              <span className="d-block">
                <p>
                  <a href="mailto:info@reti.it">info@reti.it</a>
                  <br />
                  <a href="mailto:info@reti.it">reti@pec.reti.it </a>
                  <br />
                  <a href="http://www.reti.it">www.reti.it</a>
                </p>
              </span>
            </div>

          </div>

          <div className="col-md-6 col-lg-3">

            <div className="text-center g-py-20">
              <span className="u-icon-v1 u-icon-size--xl g-color-black g-mb-10">
                <i className="fa fa-clock-o"></i>
              </span>
              <h4 className="h5 g-font-weight-600 g-mb-5">Working Time</h4>
              <span className="d-block">Monday - Friday 9:00 – 18:00</span>
            </div>

          </div>
        </div>

      </section>
    )
  }
}