'use client';
import { Grid, GridCol, Paper, Input, UnstyledButton } from '@mantine/core';
import { memo, useEffect, useState } from 'react';

import SingleMealBlock from './tableDisplayComponents/SingleMealBlocks';

import Cell from './tableDisplayComponents/Cell';

import { useSchedulerStoreContext } from '@/stores/useSchedulerStore';
import CourseMealBlock from './tableDisplayComponents/CourseMealBlock';

import classes from '@/components/calendar/calendarStyles.module.css';
import {
    Meal,
    MealInDayOptions,
    exampleMealInDayOptions,
    placeholderMeal,
} from '@/types/FoodSchedulingTypes';
import PopupWindow from './popupWindow/PopupWindow';
import { defaultRowHeader } from '@/stores/defaultValues/scheduleSliceDefault';

export interface MealInDayInfo {
    meals: Meal[];
    mealInDay: MealInDayOptions;
    date: Date;
}
const defaultMealInfo: MealInDayInfo = {
    meals: [placeholderMeal],
    mealInDay: exampleMealInDayOptions[0],
    date: new Date(),
};

// for large viewports
const WeekView = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [editMealInfo, setEditMealInfo] =
        useState<MealInDayInfo>(defaultMealInfo);

    const schedules = useSchedulerStoreContext((state) => state.foodSchedules);
    const updateSchedules = useSchedulerStoreContext(
        (state) => state.updateFoodSchedule
    );

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

    const onEditMeal = (mealInfo: MealInDayInfo) => {
        setEditMealInfo(mealInfo);
        setIsEditing(true);
        console.log(editMealInfo);
    };

    const updateMealInDay = (mealInDayInfo: MealInDayInfo) => {
        console.log(mealInDayInfo);
        // if (!mealInfo.meal || !mealInfo.mealInDay || !mealInfo.date) return;
        //TODO: update in database
        updateSchedules(
            mealInDayInfo.date,
            mealInDayInfo.mealInDay,
            mealInDayInfo.meals
        );

        setIsEditing(false);
        setEditMealInfo(defaultMealInfo);
    };

    const meal1 = 'breakfast';
    const meal2 = 'lunch';
    const meal2Headers = headerInfo.map.get(meal2);
    const meal3 = 'snack';

    return (
        <>
            <h1>Week View</h1>
            <div
                key="WeekviewTableContainer"
                className={classes.tableContainer}
            >
                <ColTitle
                    startingDate={startingWeekDate}
                    endingDate={endingWeekDate}
                />
                <GridOfDates isBeginningSpaced={true} />

                <SingleMealBlock
                    headerText={headerInfo.map.get(meal1)?.headerText ?? ''}
                    meals={schedules.map((daySchedule) => ({
                        meal:
                            daySchedule.mealInDays.get(meal1)?.[0] ??
                            placeholderMeal,
                        date: daySchedule.date,
                    }))}
                    setHeaderText={(newText) =>
                        setHeaderInfo(meal1, {
                            ...(headerInfo.map.get(meal1) ?? defaultRowHeader),
                            headerText: newText,
                        })
                    }
                    onMealPress={(meal, date) =>
                        onEditMeal({
                            meals: [meal],
                            date: date,
                            mealInDay: 'breakfast',
                        })
                    }
                />
                <CourseMealBlock
                    headers={meal2Headers ?? defaultRowHeader}
                    mealsEachDate={schedules.map((daySchedule) => ({
                        meals: daySchedule.mealInDays.get(meal2) ?? [
                            placeholderMeal,
                        ],
                        date: daySchedule.date,
                    }))}
                    setHeaderText={(newHeader) =>
                        setHeaderInfo(meal2, {
                            ...headerInfo,
                            ...newHeader,
                        })
                    }
                    onMealPress={(meals, date) =>
                        onEditMeal({
                            meals: meals,
                            date: date,
                            mealInDay: meal2,
                        })
                    }
                />
                {/* <SingleMealBlock
                    headerText={headerInfo.snackText}
                    meals={schedules.map((daySchedule) => ({
                        meal: daySchedule.snack,
                        date: daySchedule.date,
                    }))}
                    setHeaderText={(newText) =>
                        setHeaderInfo({ ...headerInfo, snackText: newText })
                    }
                    onMealPress={(meal, date) =>
                        onEditMeal({ meal, date: date, mealInDay: 'snack' })
                    }
                /> */}
            </div>
            <PopupWindow
                isOpen={isEditing}
                meals={editMealInfo?.meals}
                onClose={() => setIsEditing(false)}
                onConfirmEdit={(meals) => {
                    if (!meals) return;
                    console.log(editMealInfo);
                    updateMealInDay({
                        meals: meals,
                        mealInDay: editMealInfo?.mealInDay,
                        date: editMealInfo?.date,
                    });
                }}
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
        <Paper
            shadow="xs"
            style={{
                padding: '0.5rem',
                margin: '0.8rem',
            }}
        >
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
const GridOfDatesUnpure = (props: gridDateProps) => {
    return (
        <Grid columns={8}>
            {props.isBeginningSpaced && <GridCol span={1}></GridCol>}
            {...datesOfWeek.map((day) => <Cell key={day}>{day}</Cell>)}
        </Grid>
    );
};

const GridOfDates = memo(GridOfDatesUnpure);

export default WeekView;
