import { FoodDaySchedule } from '@/types/FoodSchedulingTypes';
import { IScheduleSliceProps } from '../scheduleSlice';

const mockScheduleArray = Array.from({ length: 7 }, () => mockDaySchedule);

const mockDaySchedule: FoodDaySchedule = {
    date: new Date(),
    breakfast: {
        mealId: '1',
        mealName: 'Cereal',
        mealType: 'breakfast',
    },
    lunch: {
        is3Course: false,
        meal1: {
            mealId: '2',
            mealName: 'Sandwich',
            mealType: 'lunch',
        },
    },
    snack: {
        mealId: '3',
        mealName: 'Apple',
        mealType: 'snack',
    },
};

export const scheduleSliceDefault: IScheduleSliceProps = {
    startingWeekDate: new Date(),
    tableHeaderInfo: {
        fromText: 'From',
        toText: 'To',
    },
    rowHeaderInfo: {
        breakfastText: 'Breakfast',
        lunchText: 'Lunch',
        meal1Text: 'Main Meal',
        meal2Text: 'Stir Fry',
        meal3Text: 'Soup',
        snackText: 'Snack',
    },
    foodSchedules: mockScheduleArray,
};
