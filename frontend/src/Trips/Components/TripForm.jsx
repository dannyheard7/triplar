import React from "react";

import UncontrolledFormFieldGroup from "../../Forms/Components/UncontrolledFormFieldGroup";
import NonFieldErrors from "../../Forms/Components/NonFieldErrors";
import DateFieldGroup from "../../Forms/Components/DateFieldGroup";
import moment from "moment";


export default class TripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: props.trip.startDate ? moment(props.trip.startDate) : moment(),
            endDate: props.trip.endDate ? moment(props.trip.endDate) : null
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.calculateEndDate = this.calculateEndDate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip.startDate !== this.props.trip.startDate || prevProps.trip.endDate !== this.props.trip.endDate) {
            this.setState({
                startDate: this.props.trip.startDate ? moment(this.props.trip.startDate) : moment(),
                endDate: this.props.trip.endDate ? moment(this.props.trip.startDate) : moment(),
            });
        }
    }

    onDateChange(value, date) {
        this.setState({
            [value]: moment(date, "DD/MM/YYYY")
        });
    }

    calculateEndDate(startDate) {
        if(this.props.trip.endDate && this.state.endDate.format("YYYY-MM-DD") === this.props.trip.endDate) {
            return this.state.endDate
        } else {
            return startDate.clone().add(3, 'days');
        }
    }

    render() {
        const errors = this.props.errors;
        const trip = this.props.trip;

        const startDate = this.state.startDate;
        const endDate = this.calculateEndDate(startDate);

        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={errors.non_field_errors}/>
                <UncontrolledFormFieldGroup errors={errors.name} label="Trip Name" name="name" type="text"
                                            value={trip.name} required={true}/>
                <DateFieldGroup errors={errors.startDate} label="Start Date" name="startDate"
                                onChange={(date) => this.onDateChange("startDate", date)}
                                value={startDate.format("DD/MM/YYYY")} required={true}/>
                <DateFieldGroup errors={errors.endDate} label="End Date" name="endDate"
                                onChange={(date) => this.onDateChange("endDate", date)}
                                value={endDate.format("DD/MM/YYYY")} required={true}/>
                <button type="submit" className="btn btn-primary">{this.props.submitLabel}</button>
            </form>
        );
    }
}

TripForm.defaultProps = {
    trip: {}
}

