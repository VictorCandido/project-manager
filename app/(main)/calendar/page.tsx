"use client";

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react";
import esLocale from '@fullcalendar/core/locales/pt-br';
import { createRef, useEffect, useState } from 'react';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/UserNav';

const CalendarPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const calendarRef = createRef<FullCalendar>();

    useEffect(() => {
      setDomLoaded(true);
    }, []);

    function handleSelectDate(date: DateSelectArg) {
        console.log(date);

        const nomeEvento = String(prompt('Digite o nome do evento'));

        const calendar = calendarRef.current?.getApi();
        calendar?.addEvent({
            title: nomeEvento,
            start: date.start,
            end: date.end
        });
    }
    

    return (
        <div>
            {domLoaded && (
                <div>
                    <FullCalendar
                        ref={calendarRef} 
                        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                        initialView="timeGridWeek"
                        headerToolbar={{ right: 'timeGridWeek,timeGridDay,dayGridMonth' }}
                        locale={esLocale}
                        themeSystem='bootstrap'
                        selectable={true}
                        // dateClick={(date) => console.log(date)}
                        select={handleSelectDate}
                    />
                </div>
            )}
        </div>
    );
}
 
export default CalendarPage;