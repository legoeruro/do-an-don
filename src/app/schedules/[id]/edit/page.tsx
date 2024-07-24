'use client';

import { useState } from 'react';
import { DatesProvider } from '@mantine/dates';
import { Button, Grid } from '@mantine/core';

import MonthCalendar from '@/components/calendar/MonthCalendar';
import WeekView from '@/components/calendar/WeekView/WeekView';
import SchedulerStoreProvider from '@/stores/schedulerStore';

function Workspace() {
    //w = week, m = month
    const [viewType, setViewType] = useState('w');
    const changeViewType = () => {
        viewType === 'w' ? setViewType('m') : setViewType('w');
    };
    return (
        <Grid>
            <Grid.Col span={3}>
                <DatesProvider settings={{ locale: 'en' }}>
                    <MonthCalendar />
                </DatesProvider>
                <Button onClick={changeViewType}></Button>
                {viewType}
            </Grid.Col>
            <Grid.Col span={9}>
                <WeekView />
            </Grid.Col>
        </Grid>
    );
}

export default Workspace;
