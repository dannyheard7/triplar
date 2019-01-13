import React from "react";

import UncontrolledFormFieldGroup from "../../Forms/Components/UncontrolledFormFieldGroup";
import NonFieldErrors from "../../Forms/Components/NonFieldErrors";
import DateFieldGroup from "../../Forms/Components/DateFieldGroup";
import moment from "moment";


export default class TripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrivalDate: props.trip.arrivalDate ? moment(props.trip.arrivalDate) : moment(),
            departureDate: props.trip.departureDate ? moment(props.trip.departureDate) : null
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.calculateEndDate = this.calculateEndDate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip.arrivalDate !== this.props.trip.arrivalDate || prevProps.trip.departureDate !== this.props.trip.departureDate) {
            this.setState({
                arrivalDate: this.props.trip.arrivalDate ? moment(this.props.trip.arrivalDate) : moment(),
                departureDate: this.props.trip.departureDate ? moment(this.props.trip.arrivalDate) : moment(),
            });
        }
    }

    onDateChange(value, date) {
        this.setState({
            [value]: moment(date, "DD/MM/YYYY")
        });
    }

    calculateEndDate(startDate) {
        if(this.props.trip.departureDate && this.state.departureDate.format("YYYY-MM-DD") === this.props.trip.departureDate) {
            return this.state.departureDate
        } else {
            return startDate.clone().add(3, 'days');
        }
    }

    render() {
        const fieldErrors = this.props.fieldErrors;
        const trip = this.props.trip;

        const startDate = this.state.arrivalDate;
        const endDate = this.calculateEndDate(startDate);

        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={this.props.nonFieldErrors}/>
                <UncontrolledFormFieldGroup errors={fieldErrors.name} label="Trip Name" name="name" type="text"
                                            value={trip.name} required={true}/>
                <DateFieldGroup errors={fieldErrors.arrivalDate} label="Start Date" name="startDate"
                                onChange={(date) => this.onDateChange("startDate", date)}
                                value={startDate.format("DD/MM/YYYY")} required={true}/>
                <DateFieldGroup errors={fieldErrors.departureDate} label="End Date" name="endDate"
                                onChange={(date) => this.onDateChange("endDate", date)}
                                value={endDate.format("DD/MM/YYYY")} required={true}/>
                <button type="submit" className="btn btn-primary">{this.props.submitLabel}</button>
            </form>
        );
    }
}

TripForm.defaultProps = {
    trip: {}
};

