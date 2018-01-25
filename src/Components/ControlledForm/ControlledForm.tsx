import * as React from 'react';
import * as common from '../../Models/common'
import { RouteComponentProps } from 'react-router';
import { Car } from '../../Models/common';
import {
    DatePicker,
    DayOfWeek
} from 'office-ui-fabric-react/lib/DatePicker';
import { FormEvent } from 'react';


export interface ControlledFormProps extends RouteComponentProps<any> {
    Id: number
}
export interface ControlledFormState {
    car: Car,
    firstDayOfWeek?: DayOfWeek;
    Name: string | null,
    Email: string | null,
    isActive: boolean,
    ToDate: Date,
    FromDate: Date
}

export class ControlledForm extends React.Component<ControlledFormProps, ControlledFormState> {

    constructor(prop: ControlledFormProps, state: ControlledFormState) {
        super(prop, state);
        this.state = {
            car: new Car(),
            firstDayOfWeek: DayOfWeek.Sunday,
            Name: null,
            Email: null,
            isActive: false,
            ToDate: null,
            FromDate: null,
        };


    }

    render() {

        return (
            <div className="col-md-11">

                <form onSubmit={(e) => this.onSubmit(e)}>
                    <span className="col-md-12">
                        <div className="form-group col-md-6">
                            <label >Login Name</label>
                            <input type="text" className="form-control" value={this.state.Name} onChange={e => this.setState({ Name: e.target.value })} aria-describedby="emailHelp" placeholder="Enter Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Email </label>
                            <input type="mail" className="form-control" value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })} placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label >From : </label>
                            <DatePicker isRequired={true} value={this.state.FromDate!} onSelectDate={(date: Date | null | undefined) => this.setState({ FromDate: date })} firstDayOfWeek={this.state.firstDayOfWeek} strings={common.DayPickerStrings} placeholder='Select a date...' />
                        </div>
                        <div className="form-group col-md-6">
                            <label >To : </label>
                            <DatePicker isRequired={true} value={this.state.ToDate!} onSelectDate={(date: Date | null | undefined) => this.setState({ ToDate: date })} firstDayOfWeek={this.state.firstDayOfWeek} strings={common.DayPickerStrings} placeholder='Select a date...' />
                        </div>
                        <div className="form-check col-md-6">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" checked={this.state.isActive} onChange={e => this.setState({ isActive: e.target.checked })} />
                                is Already Authorized
                        </label>
                        </div>
                    </span>
                    <span className="col-md-12">
                        <button type="submit" className="btn btn-primary">Rent Car</button>
                    </span>
                </form>
            </div>
        )
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {

        console.log("Name : " + this.state.Name);
        console.log("Name : " + this.state.Email);
        console.log("Name : " + this.state.isActive);
        console.log("Date : " + this.state.FromDate);
        console.log("Date : " + this.state.ToDate);

        e.stopPropagation();
    }
}