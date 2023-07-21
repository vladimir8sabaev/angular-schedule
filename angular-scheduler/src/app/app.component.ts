import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('calendar') calendar: FullCalendarComponent;
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
    eventStartEditable: true,
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
    buttonText: {
      today: 'Сегодня',
    },
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
  };
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Введите название нового события');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        title,
        date: selectInfo.startStr,
      });
    }
  }
  handleEventClick(clickInfo: EventClickArg) {
    const title = prompt('Введите новое название для существующего события:');
    const date = clickInfo.event.start;
    let calendarApi = this.calendar.getApi();
    if (title) {
      const event = {
        title: title,
        date: `${date?.getFullYear()}-${String(date!.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(date!.getDate()).padStart(2, '0')}`,
      };
      this.scheduleEvents.push(event);
      this.scheduleEvents = this.scheduleEvents.filter(
        (item) => item.title !== clickInfo.event.title
      );
      calendarApi.addEvent(event);
      clickInfo.event.remove();
      console.log(this.scheduleEvents);
    }
  }
  handleEventDrop(dropInfo: EventDropArg) {
    this.scheduleEvents = this.scheduleEvents.filter(
      (item) => item.title !== dropInfo.event.title
    );
    let calendarApi = this.calendar.getApi();
    const title = dropInfo.event.title;
    const date = dropInfo.event.start;
    const event = {
      title: title,
      date: `${date?.getFullYear()}-${String(date!.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date!.getDate()).padStart(2, '0')}`,
    };
    dropInfo.event.remove();
    this.scheduleEvents.push(event);
    calendarApi.addEvent(event);
    console.log('date changed');
  }
}
