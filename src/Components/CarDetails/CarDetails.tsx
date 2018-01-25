import * as React from 'react';

import { RouteComponentProps, Redirect } from 'react-router';
import { Car } from '../../Models/common';
import * as $ from 'jquery';
//import { Calendar } from '../Calendar/Calendar';

export interface CarDetailsProps extends RouteComponentProps<any> {
    Id: number;
}
export interface CarDetailsState {
    car: Car;
    goToCalendar: boolean;
    goToForm: boolean;
}

export class CarDetails extends React.Component<CarDetailsProps, CarDetailsState> {

    constructor(prop: CarDetailsProps, state: CarDetailsState) {
        super(prop, state);
        this.state = { goToCalendar: false, goToForm: false, car: new Car() };
    }

    componentDidMount() {
        console.log(this.props.match.params.Id);


        $.ajax({
            url:'https://httpbin.org/get'
        }).done(()=>{
        //Simulate call to obtain car whit id
                this.setState({
                    car: new Car({
                        Name: '500C',
                        Marca: 'Fiat',
                        Targa: 'FB654KM',
                        KM: 1000,
                        Id: 1,
                        image: require('../../images/Car/500C.png')
                    })
                });
        })
        .fail(()=>{
            console.log('error');
        })
    }

    ShowReservation(event: any) {

        this.setState({ goToCalendar: true });
    }

    ShowForm(event: any) {

        this.setState({ goToForm: true });
    }

    render() {

        if (this.state.goToCalendar) {
            return <Redirect
                to={{
                    pathname: '/Calendar/' + this.state.car.Id,
                    state: { referrer: document.location }
                }}
            />;
        }
        else if (this.state.goToForm) {
            return <Redirect
                to={{
                    pathname: '/RentCarFormix/',
                    state: { referrer: document.location }
                }}
            />;
        }
        else {
            if (this.state)
                return (
                    <div style={{ maxWidth: '1260px', marginRight: 'auto', marginLeft: 'auto' }}>
                        <header>
                            <section id="top-navigation" className="container-fluid nopadding">
                                <div className="row nopadding ident ui-bg-color01">

                                    <div className="col-md-3 vc-photo photo-01" style={{
                                        width: '310px',
                                        height: '300px',
                                        backgroundImage: 'url(' + this.state.car.image + ')',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        marginRight: '5px'
                                    }} />
                                    <div className="col-md-9 vc-name nopadding">
                                        <div className="row nopadding name">
                                            <div className="col-md-10 name-title"><h1 className="font-accident-two-extralight">{this.state.car.Name}</h1></div>

                                        </div>
                                        <div className="row nopadding position">
                                            <div className="col-md-10 position-title">

                                                <section className="cd-intro">
                                                    <h2 className="cd-headline clip is-full-width font-accident-two-light">
                                                        <span>Status :  </span>
                                                        <span className="cd-words-wrapper" style={{ width: '160px' }}>
                                                            <b className="is-hidden"> Free </b>
                                                        </span>
                                                    </h2>
                                                </section>

                                            </div>
                                        </div>
                                        <ul id="nav" className="row nopadding cd-side-navigation ui-menu-color06">
                                            <li className="col-xs-4 col-sm-2 cursor-hand nopadding menuitem color1" onClick={(e) => this.ShowForm(e)}>
                                                <span className="menuIcon">
                                                    <i className="fa fa-car"></i><div style={{ fontSize: '15px' }}>Rent</div>
                                                </span>
                                            </li>
                                            <li className="col-xs-4 col-sm-2 cursor-hand nopadding menuitem color2" onClick={(e) => this.ShowReservation(e)}>
                                                <span className="menuIcon">
                                                    <i className="fa fa-calendar"></i><div style={{ fontSize: '15px' }}>Reservation</div>
                                                </span>
                                            </li>
                                            <li className="col-xs-4 col-sm-2 cursor-hand nopadding menuitem color3" >

                                                <span className="menuIcon">
                                                    <i className="fa fa-info"></i><div style={{ fontSize: '15px' }}>Information</div>
                                                </span>
                                            </li>
                                            <li className="col-xs-4 col-sm-6 menuitem info color5" >
                                                <span className="uppercase">Name:</span>
                                                <span className="two">{this.state.car.Name}</span>
                                                <br />
                                                <span className="uppercase">KM:</span>
                                                <span className="two">{this.state.car.KM}</span>
                                                <br />
                                                <span className="uppercase">Year of registration:</span>
                                                <span className="two">2005</span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </section>
                        </header>
                        <div className="content-wrap">

                            <section className="" data-section="home">

                                <div className="col-md-12 nopadding">
                                    <div id="details" className="col-md-12 flex-column bg-color01 light nopadding" style={{ backgroundColor: '#efefef' }}>
                                        <div className="padding-50 flex-panel">
                                            <div className="row row-no-padding">
                                                <div className="col-md-12 nopadding">
                                                    <h3 className="font-accident-two-normal uppercase title">Description</h3>

                                                </div>
                                            </div>
                                            <div className="divider-dynamic"></div>
                                            <div className="row nopadding">
                                                <div className="col-md-12 infoblock">
                                                    <div className="row">
                                                        <p style={{ padding: '15px' }}>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia rhoncus blandit. Nulla scelerisque sagittis eros, a consectetur arcu cursus non. Nam nec sollicitudin ipsum. Donec pellentesque volutpat ultrices. Phasellus ultrices rutrum augue, sit amet convallis lectus pharetra ut. Sed et vehicula nisl. Fusce aliquam tempus ipsum, vel congue justo iaculis eu. Phasellus in enim a nunc lobortis rutrum tincidunt egestas metus.

                                            Nulla in feugiat odio. Vivamus elementum augue ut luctus gravida. Vivamus in diam commodo, cursus ante sed, consequat mi. Aenean mollis dolor ante, sit amet dictum metus pretium sed. Proin euismod maximus commodo. Vestibulum porta interdum facilisis. Sed ac ligula eu odio mattis placerat vel eget ante. Nam vel odio nec libero tincidunt cursus et ac tortor. Pellentesque nec consectetur orci, vitae sodales dui.
                                        </p>
                                                    </div>
                                                    <div className="divider-dynamic"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>
                            {/*<section className="col-md-12">
                                <h3> Reserved For </h3>
                                <Calendar showToolBar={true} ></Calendar>
                                </section>*/}
                        </div>
                    </div>
                );
            else
                return (<div></div>);
        }


    }
}