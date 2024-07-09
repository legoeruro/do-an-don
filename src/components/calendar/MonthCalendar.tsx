const Calendar = require('@toast-ui/react-calendar');
require('@toast-ui/calendar/dist/toastui-calendar.min.css');

const MonthCal = new Calendar('#container', {
    defaultView: 'month',
    useCreationPopup: true,
    useDetailPopup: true,
    calendars: [
        {
        id: '1',
        name: 'Private',
        bgColor: '#9e5fff',
        borderColor: '#9e5fff'
        },
        {
        id: '2',
        name: 'Company',
        bgColor: '#00a9ff',
        borderColor: '#00a9ff'
        }
    ],
    schedule: {
        title: 'TOAST UI Calendar Study',
        body: 'This is a sample event',
        start: new Date(),
        end: new Date(new Date().getTime() + 1000 * 60 * 60),
        isAllDay: true,
        category: 'time'
    }
    });
})

export default function MonthCalendar() {
    return (
    <div
    >
        <Calendar />
AAA
    </div>
  );
}