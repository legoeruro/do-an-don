import { Grid, GridCol, Paper, Input } from '@mantine/core';
import { memo, useEffect, useState } from 'react';

import SingleMealBlock from './tableDisplayComponents/SingleMealBlocks';

import Cell from './tableDisplayComponents/Cell';

import { useSchedulerStoreContext } from '@/stores/useSchedulerStore';
import CourseMealBlock from './tableDisplayComponents/CourseMealBlock';

import classes from '@/components/calendar/calendarStyles.module.css';
import { Meal, MealInDay } from '@/types/FoodSchedulingTypes';
import PopupWindow from './popupWindow';

// for large viewports
const WeekView = () => {
    const [isEditing, setIsEditing] = useState(false);
    interface MealInfo {
        meal: Meal;
        mealInDay: MealInDay;
        day: Date;
    }
    const [editMealInfo, setEditMealInfo] = useState<undefined | MealInfo>(
        undefined
    );

    const schedules = useSchedulerStoreContext((state) => state.foodSchedules);
    const updateSchedules = useSchedulerStoreContext(
        (state) => state.updateFoodSchedule
    );
    const datesData = schedules.map((schedule) => ({
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

    const updateSingleMeal = (
        meal: Meal | undefined,
        mealInDay: MealInDay | undefined,
        date: Date | undefined
    ) => {
        if (!meal || !mealInDay || !date) return;
        //TODO: update in database
        const index = schedules.findIndex(
            (e) => e.date.getDate() === date.getDate()
        );
        updateSchedules(index, {
            ...schedules[index],
            [mealInDay]: meal,
        });

        setIsEditing(false);
        setEditMealInfo(undefined);
    };

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
            </div>
            <PopupWindow
                isOpen={isEditing}
                meal={editMealInfo?.meal}
                onClose={() => setIsEditing(false)}
                onConfirmEdit={(meal) =>
                    updateSingleMeal(
                        meal,
                        editMealInfo?.mealInDay,
                        editMealInfo?.day
                    )
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
