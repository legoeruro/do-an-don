import { Grid, GridCol, Paper, Input } from '@mantine/core';
import { useEffect, useState } from 'react';

import SingleMealBlock from './SingleMealBlocks';

import { RowHeaderInfo } from '../../../types/CalendarComponentTypes';
import EditableString from '../../utilities/EditableString';

import Cell from '../cells/Cell';
import { FoodDaySchedule, Lunch } from '@/types/foodSchedulingTypes';

import { useSchedulerStoreContext } from '@/stores/useSchedulerStore';
import { scheduler } from 'timers/promises';
import CourseMealBlock from './CourseMealBlock';

// for large viewports
const WeekView = () => {
    //TODO: replace with actual data
    const daySchedules = useSchedulerStoreContext(
        (state) => state.foodSchedules
    );
    const datesData = daySchedules.map((schedule) => ({
        ...schedule,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
    }));

    const headerInfo = useSchedulerStoreContext((state) => state.rowHeaderInfo);
    const setHeaderInfo = useSchedulerStoreContext(
        (state) => state.updateRowHeaderInfo
    );
    const startingWeekDate = useSchedulerStoreContext(
        (state) => state.startingWeekDate
    );
    const endingWeekDate = new Date(
        startingWeekDate.getDate() + 7 * 24 * 60 * 60 * 1000
    );

    return (
        <>
            <div>
                <h1>Week View</h1>
                test
            </div>
            <ColTitle
                startingDate={startingWeekDate}
                endingDate={endingWeekDate}
            />
            <GridOfDates isBeginningSpaced={true} />

            <SingleMealBlock
                headerText={headerInfo.breakfastText}
                meals={datesData.map((daySchedule) => ({
                    mealName: daySchedule.breakfast.mealName,
                    date: daySchedule.date,
                }))}
                setHeaderText={(newText) =>
                    setHeaderInfo({ ...headerInfo, breakfastText: newText })
                }
            />
            <CourseMealBlock
                headerText={headerInfo.lunchText}
                meal1Text={headerInfo.meal1Text}
                meal2Text={headerInfo.meal2Text}
                meal3Text={headerInfo.meal3Text}
                meals={datesData.map((daySchedule) => ({
                    lunch: daySchedule.lunch,
                    date: daySchedule.date,
                }))}
                setHeaderText={(newText) =>
                    setHeaderInfo({
                        ...headerInfo,
                        ...newText,
                    })
                }
            />
            <SingleMealBlock
                headerText={headerInfo.snackText}
                meals={datesData.map((daySchedule) => ({
                    mealName: daySchedule.snack.mealName,
                    date: daySchedule.date,
                }))}
                setHeaderText={(newText) =>
                    setHeaderInfo({ ...headerInfo, snackText: newText })
                }
            />
        </>
    );
};

const ColTitle = ({
    startingDate,
    endingDate,
}: {
    startingDate: Date;
    endingDate: Date;
}) => {
    return (
        <Paper shadow="xs">
            Schedule from {startingDate.toLocaleDateString('vi-VN')} to{' '}
            {endingDate.toLocaleDateString('vi-VN')}
        </Paper>
    );
};

const datesOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
// defaults to monday as starting date

interface gridDateProps {
    isBeginningSpaced: boolean;
}
const GridOfDates = (props: gridDateProps) => {
    return (
        <Grid columns={8}>
            {props.isBeginningSpaced && <GridCol span={1}></GridCol>}
            {...datesOfWeek.map((day) => <Cell key={day}>{day}</Cell>)}
        </Grid>
    );
};

export default WeekView;
