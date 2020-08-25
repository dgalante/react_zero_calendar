import moment from "moment";

export const prepareEvents = (events = []) => {
    return events.map(
        event => ( prepareEventDate(event) )
    );
}

export const prepareEventDate = (event) => {
    return {
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate()
    }    
}