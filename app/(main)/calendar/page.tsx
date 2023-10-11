"use client";

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react";
import esLocale from '@fullcalendar/core/locales/pt-br';
import { createRef, useEffect, useState } from 'react';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import useWindowDimensions from '@/hooks/useWindowDimensions ';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const calendarRef = createRef<FullCalendar>();
    const { height } = useWindowDimensions();

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

    function update() {
        // Implementar para atualizar sempre que abrir e fechar sidebar
        calendarRef.current?.getApi().updateSize();
    }
    

    return (
        <div>
            <Button onClick={() => update()}>Atualizar</Button>
            {domLoaded && (
                <FullCalendar
                    height={height - 110}
                    windowResizeDelay={300}
                    fixedWeekCount={false}
                    handleWindowResize
                    navLinks
                    editable
                    displayEventTime
                    expandRows
                    eventOrder={'start'}
                    ref={calendarRef} 
                    plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{ right: 'timeGridWeek,timeGridDay,dayGridMonth' }}
                    locale={esLocale}
                    themeSystem='bootstrap'
                    selectable
                    // dateClick={(date) => console.log(date)}
                    select={handleSelectDate}
                />
            )}
        </div>
    );
}
 
export default CalendarPage;