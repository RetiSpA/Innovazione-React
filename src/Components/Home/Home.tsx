import * as React from 'react';

import './Home.css';

export interface HomeProps { }
export interface HomeState { date: Date; }
// 'HelloProps' describes the shape of props.
export class Home extends React.Component<HomeProps, HomeState> {
    
    constructor (props: HomeProps) {
        super(props);
        this.state = {date: new Date()};
      }
    
    render() {
        return ( 
           <section id="hero" className="m-center text-center bg-shop full-height">
           <div className="center-box">
             <div className="container-fluid nopadding">
               <div className="col-sm-12 img-hero" />
             </div>
           </div>
            </section>
          );
    }
}