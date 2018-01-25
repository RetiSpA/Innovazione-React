import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import * as React from 'react';
import * as common from '../../Models/common'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export interface CalendarProps {
    showToolBar: boolean
}
export interface CalendarState {
}
// 'HelloProps' describes the shape of props.
export class Calendar extends React.Component<CalendarProps, CalendarState> {

    public myEventsList: Array<any> = common.Event;
    constructor(prop: CalendarProps, state: CalendarState) {
        super(prop, state);
        // Setup the localizer by providing the moment (or globalize) Object
        // to the correct localizer.
        BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

    }


    render() {
        return (
            <div className='col-md-11' style={{ height: '600px' }}>
                <BigCalendar
                    events={this.myEventsList}
                    toolbar={this.props.showToolBar}
                />
            </div>
        )
    }

}