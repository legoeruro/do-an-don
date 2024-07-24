import { Grid, GridCol, Paper, Input } from '@mantine/core';
import { useEffect, useState } from 'react';

import BreakfastBlock from './BreakfastBlock';

import { RowHeaderInfo } from '../../../types/CalendarComponentTypes';
import EditableString from '../../utilities/EditableString';

import Cell from '../cells/Cell';
import { FoodDaySchedule, Lunch } from '@/types/foodSchedulingTypes';

import { useSchedulerStoreContext } from '@/stores/useSchedulerStore';

// for large viewports
const WeekView = () => {
    const datesData = Array.from({ length: 7 }, () => ({
        ...mockDaySchedule,
        date: new Date(Date.now() + Math.random() * 1000000000),
    }));

    const defaultRowHeaderInfo: RowHeaderInfo = {
        breakfastText: 'Breakfast',
        lunchText: 'Lunch',
        mainMealText: 'Main Meal',
        stirFryText: 'Stir Fry',
        soupText: 'Soup',
        snackText: 'Snack',
    };

    const headerInfo = useSchedulerStoreContext((state) => state.rowHeaderInfo);
    const setHeaderInfo = useSchedulerStoreContext(
        (state) => state.updateRowHeaderInfo
    );
    const foodSchedules = useSchedulerStoreContext(
        (state) => state.foodSchedules
    );
    const startingWeekDate = useSchedulerStoreContext(
        (state) => state.startingWeekDate
    );
    const endingWeekDate = new Date(
        startingWeekDate.getDate() + 7 * 24 * 60 * 60 * 1000
    );

    const LunchBlock = () => (
        <Grid columns={8}>
            <Cell>
                <Grid columns={2}>
                    <Grid.Col span={1}>
                        <Paper shadow="xs">
                            <EditableString
                                text={headerInfo.lunchText}
                                onEditText={(newText) =>
                                    setHeaderInfo({
                                        ...headerInfo,
                                        lunchText: newText,
                                    })
                                }
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Paper shadow="xs">
                            <EditableString
                                text={headerInfo.mainMealText}
                                onEditText={(newText) =>
                                    setHeaderInfo({
                                        ...headerInfo,
                                        mainMealText: newText,
                                    })
                                }
                            />
                        </Paper>
                        <Paper shadow="xs">
                            <EditableString
                                text={headerInfo.stirFryText}
                                onEditText={(newText) =>
                                    setHeaderInfo({
                                        ...headerInfo,
                                        stirFryText: newText,
                                    })
                                }
                            />
                        </Paper>
                        <Paper shadow="xs">
                            <EditableString
                                text={headerInfo.soupText}
                                onEditText={(newText) =>
                                    setHeaderInfo({
                                        ...headerInfo,
                                        soupText: newText,
                                    })
                                }
                            />
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Cell>
            {...datesData.map((daySchedule) => (
                <Cell key={daySchedule.date.toString()}>
                    <ElementFromLunch lunch={daySchedule.lunch} />
                </Cell>
            ))}
        </Grid>
    );

    const SnackBlock = () => (
        <Grid columns={8}>
            <Cell>
                <EditableString
                    text={headerInfo.snackText}
                    onEditText={(newText) =>
                        setHeaderInfo({ ...headerInfo, snackText: newText })
                    }
                />
            </Cell>
            {...datesData.map((daySchedule) => (
                <Cell key={daySchedule.date.toString()}>
                    {daySchedule.snack.mealName}
                </Cell>
            ))}
        </Grid>
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

            <BreakfastBlock
                breakfastText={headerInfo.breakfastText}
                breakfastMeals={datesData.map((daySchedule) => ({
                    mealName: daySchedule.breakfast.mealName,
                    date: daySchedule.date,
                }))}
                setBreakfastText={(newText) =>
                    setHeaderInfo({ ...headerInfo, breakfastText: newText })
                }
            />
            <LunchBlock />
            <SnackBlock />
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

interface elementFromLunchProps {
    lunch: Lunch;
}

const ElementFromLunch = (props: elementFromLunchProps) => {
    return (
        <>
            {props.lunch.is3Course && <>{props.lunch.mainMeal.mealName}</>}
            {!props.lunch.is3Course && (
                <>
                    {props.lunch.mainMeal.mealName}
                    {props.lunch.stirFry?.mealName}
                    {props.lunch.soup?.mealName}
                </>
            )}
        </>
    );
};

const mockDaySchedule: FoodDaySchedule = {
    date: new Date(),
    breakfast: {
        mealId: '1',
        mealName: 'Cereal',
        mealType: ['breakfast'],
    },
    lunch: {
        is3Course: false,
        mainMeal: {
            mealId: '2',
            mealName: 'Sandwich',
            mealType: ['lunch'],
        },
    },
    snack: {
        mealId: '3',
        mealName: 'Apple',
        mealType: ['snack'],
    },
};

export default WeekView;
