import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { Car } from '../../Models/common'
import { Redirect } from 'react-router';

import * as $ from 'jquery';

export interface CarListProps { }
export interface CarListState {
    carList: Array<any>,
    goToDetails: boolean,
    goToRent: boolean
}

export class CarList extends React.Component<CarListProps, CarListState> {


    //carList:Array<any>=[]
    public divStyle: any = {
        height: '162 px'
    };

    public imgStyle = {};
    public selectedCarId: number | null;

    constructor(prop: CarListProps, state: CarListState) {
        super(prop, state);
        /*   let x= new Car();
           console.log(x.Name);*/
        var DuckImage = require('../../images/Car/500C.jpg');

        this.imgStyle = {
            width: '180px',
            height: '180px',
            backgroundImage: 'url(' + DuckImage + ')',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: "no-repeat"
        }

        this.state = {
            goToRent: false,
            goToDetails: false,
            carList: []
        };
    }

    componentDidMount() {
        $.ajax({
            url:'https://httpbin.org/get'
        }).done(()=>{
        //Simulate call to obtain car whit id

        this.setState({ carList: [new Car({
            Name: '500C',
            Marca: 'Fiat',
            Targa: 'FB654KM',
            KM: 1000,
            Id: 1,
            image: require('../../images/Car/500C.png')
        }),
        new Car({
            Name: 'Ferrari',
            Marca: 'Ferrari',
            Targa: 'FB622KM',
            KM: 0,
            Id: 2,
            image: require('../../images/Car/ferrari.png')
        }),
        new Car({
            Name: 'Punto',
            Marca: 'Fiat',
            Targa: 'KM345KI',
            KM: 10000,
            Id: 3,
            image: require('../../images/Car/punto.jpg')
        }),
        new Car({
            Name: 'Renault',
            Marca: 'Renaul',
            Targa: 'UI890LM',
            KM: 600,
            Id: 4,
            image: require('../../images/Car/renault.png')
        }),
        new Car({
            Name: 'Chevrolet',
            Marca: 'Chevrolet',
            Targa: 'YT654MK',
            KM: 0,
            Id: 5,
            image: require('../../images/Car/chevrolet.png')
        })]})
        })
        .fail(()=>{


        })
    }

    SelectCar(e: any, idCar: any): any {
        if (idCar) {
            this.selectedCarId = idCar;

            this.setState({ goToDetails: true });
        }
    }

    RentCar(e: any, idCar: any): any {
        if (idCar) {
            this.selectedCarId = idCar;

            this.setState({ goToRent: true });
        }

    }
    render() {
        if (this.state.goToDetails == true) {
            return <Redirect to={{
                pathname: '/CarDetails/' + this.selectedCarId,
                state: { referrer: document.location }
            }} />;
        }
        else if (this.state.goToRent == true) {
            return <Redirect to={{
                pathname: '/RentCar/' + this.selectedCarId,
                state: { referrer: document.location }
            }} />;
        }
        else {
            return (

                <div className="col-lg-12 ">
                    <div className="row">
                        {this.state.carList.map((car: Car) => {



                            return <div className="col-lg-4 g-mb-30">
                                <article className="g-bg-secondary">
                                    <div className="img-fluid" style={{
                                        width: '450px',
                                        height: '400px',
                                        backgroundImage: 'url(' + car.image + ')',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: "no-repeat"
                                    }} />
                                    <div className="g-pa-25">
                                        <h3 className="h4 g-font-weight-300 g-mb-15">
                                            {car.Name}
                                        </h3>
                                        <p>At vero eos et accusamus et iusto odio design issimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.</p>
                                    </div>

                                    <ul className="u-list-inline g-font-size-12 g-brd-top g-brd-gray-light-v4 g-pa-15-20">
                                        <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>
                                            <CommandBarButton
                                                primary={true}
                                                data-automation-id='test2'
                                                iconProps={{ iconName: 'ZoomIn' }}
                                                text='Show Details'
                                                onClick={(e) => this.SelectCar(e, car.Id)}
                                            />

                                            <CommandBarButton
                                                primary={true}
                                                data-automation-id='test2'
                                                iconProps={{ iconName: 'Mail' }}
                                                text='Rent Car'
                                                onClick={(e) => this.RentCar(e, car.Id)}
                                            />
                                        </div>
                                    </ul>
                                </article>
                            </div>
                        })}


                    </div>
                </div>
            )
        }

    }
}