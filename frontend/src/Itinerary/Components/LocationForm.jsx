import React from "react";
import NonFieldErrors from "../../Forms/Components/NonFieldErrors";
import CitySearchFieldContainer from "../../Forms/Containers/CitySearchFieldContainer";
import DateFieldGroup from "../../Forms/Components/DateFieldGroup";
import moment from "moment";

moment.locale('en');

export default class LocationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: props.location.startDate ? moment(props.location.startDate) : moment(),
            endDate: props.location.endDate ? moment(props.location.endDate) : moment()
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.calculateEndDate = this.calculateEndDate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.startDate !== this.props.location.startDate || prevProps.location.endDate !== this.props.location.endDate) {
            this.setState( {
                startDate: moment(this.props.location.startDate),
                endDate: moment(this.props.location.endDate)
            });
        }
    }

    onDateChange(value, date) {
        this.setState({
            [value]: moment(date, "DD/MM/YYYY")
        });
    }

    calculateEndDate(startDate) {
        const location = this.props.location;

        if(this.state.endDate && this.state.endDate.format("YYYY-MM-DD") !== location.endDate) {
            return this.state.endDate;
        } else {
            return startDate.clone().add(1, 'days');
        }
    }

    render() {
        const errors = this.props.errors;
        const itinerary = (this.props.location) ? this.props.location : {};
        const location = itinerary.city ? itinerary.city.name_std + ", " + itinerary.city.country : "";

        const startDate = this.state.startDate;
        const endDate = this.calculateEndDate(this.state.startDate);

        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={errors.non_field_errors}/>
                <CitySearchFieldContainer errors={errors.locations} value={location} name="city"/>
                <DateFieldGroup errors={errors.startDate} label="Arrival" name="startDate"
                                value={startDate.format("DD/MM/YYYY")} required={true}
                                onChange={(date) => this.onDateChange("startDate", date)}/>
                <DateFieldGroup errors={errors.endDate} label="Departure" name="endDate"
                                value={endDate.format("DD/MM/YYYY")} required={true}
                                 onChange={(date) => this.onDateChange("endDate", date)}/>
                <button type="submit" className="btn btn-primary">{this.props.submitLabel}</button>
            </form>
        );
    }
}
