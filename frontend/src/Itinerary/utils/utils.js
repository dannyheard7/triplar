import Moment from 'moment';

export function daysBetweenDates(start_date, end_date) {
    let end = end_date.clone().add(1, "days");
    let diff = end.diff(start_date, 'days');
    let days = [];

    for (let i = 0; i < diff; i++) {
        let date = start_date.clone();
        date.add(i, 'days');
        days.push(date)
    }

    return days;
}
