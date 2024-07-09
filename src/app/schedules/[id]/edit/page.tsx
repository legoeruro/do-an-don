'use client';

import { useState } from 'react';
import { DatesProvider } from "@mantine/dates";
import WeekCalendar from '@/components/calendar/week/WeekCalendar' 
import MonthCalendar from '@/components/calendar/month/MonthCalendar'
import { Button } from '@mantine/core';

export default function workspace() {
    //w = week, m = month
    const [viewType, setViewType] = useState('w');
    const CalendarView = viewType === 'w' ? WeekCalendar : MonthCalendar;
    const changeViewType = () => {
        viewType === 'w' ? setViewType('m') : setViewType('w');
    }
    return (
        <div>
            <DatesProvider
                settings={{ locale: 'en'}}
            >
                <CalendarView />
            </DatesProvider>
            <Button
                onClick={changeViewType}>
            </Button>
            {viewType}
        </div>
    )
}