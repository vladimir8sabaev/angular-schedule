import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  eventGuid: number = 0;
  createEventId() {
    return String(this.eventGuid++);
  }
  scheduleEvents = [
    { title: 'event 1', date: '2023-07-27' },
    { title: 'event 2', date: '2023-07-21' },
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    firstDay: 1,
    locale: 'ru',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    selectMirror: true,
    dayMaxEvents: true,
    defaultAllDay: true,
    defaultAllDayEventDuration: { days: 1 },
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next today',
    },
    events: this.scheduleEvents,
  };
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }
}
