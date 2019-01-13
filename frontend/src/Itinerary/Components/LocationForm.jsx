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
            arrivalDate: props.location.arrivalDate ? moment(props.location.arrivalDate) : moment(),
            departureDate: props.location.departureDate ? moment(props.location.departureDate) : moment()
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.calculateEndDate = this.calculateEndDate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.arrivalDate !== this.props.location.arrivalDate || prevProps.location.departureDate !== this.props.location.departureDate) {
            this.setState( {
                arrivalDate: moment(this.props.location.arrivalDate),
                departureDate: moment(this.props.location.departureDate)
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

        if(this.state.departureDate && this.state.departureDate.format("YYYY-MM-DD") !== location.departureDate) {
            return this.state.departureDate;
        } else {
            return startDate.clone().add(1, 'days');
        }
    }

    render() {
        const fieldErrors = this.props.fieldErrors;
        const itinerary = (this.props.location) ? this.props.location : {};
        const location = itinerary.city ? itinerary.city.name_std + ", " + itinerary.city.country : "";

        const arrivalDate = this.state.arrivalDate;
        const departureDate = this.calculateEndDate(this.state.arrivalDate);

        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={this.props.nonFieldErrors}/>
                <CitySearchFieldContainer errors={fieldErrors.locations} value={location} name="city"/>
                <DateFieldGroup errors={fieldErrors.arrivalDate} label="Arrival" name="arrivalDate"
                                value={arrivalDate.format("DD/MM/YYYY")} required={true}
                                onChange={(date) => this.onDateChange("arrivalDate", date)}/>
                <DateFieldGroup errors={fieldErrors.departureDate} label="Departure" name="departureDate"
                                value={departureDate.format("DD/MM/YYYY")} required={true}
                                onChange={(date) => this.onDateChange("departureDate", date)}/>
                <button type="submit" className="btn btn-primary">{this.props.submitLabel}</button>
            </form>
        );
    }
}
