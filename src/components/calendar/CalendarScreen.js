import React, { useState } from 'react'
import moment from "moment";
import 'moment/locale/es';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/uiActions';
import { eventSetActive } from '../../redux/actions/eventsActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer( moment );

const CalendarScreen = () => {

    const initLastView = localStorage.getItem('lastView') || 'month';
    const [lastView, setLastView] = useState(initLastView)
    const dispatch = useDispatch();
    const { activeEvent } = useSelector((state) => state.calendar);
    const { events } = useSelector( state => state.calendar );

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (event) => {
        dispatch( eventSetActive(event) );
    }

    const onViewChange = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    }    

    const eventStyleGetter = ( event, start, end, isSelected ) => {        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return { style }
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                className="calendar"
                localizer={ localizer }
                defaultDate={new Date()}
                defaultView="month"
                events={ events }
                messages={ messages }
                eventPropGetter= { eventStyleGetter }
                components={{ 
                    event: CalendarEvent 
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }  
                view={ lastView }
                />
            <CalendarModal />

            <AddNewFab />

            { activeEvent && <DeleteEventFab /> }
            
        </div>
    )
}

export default CalendarScreen;
