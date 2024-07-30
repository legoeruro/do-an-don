import { FoodDaySchedule } from '@/types/FoodSchedulingTypes';
import { IScheduleSliceProps } from '../scheduleSlice';
import { RowHeader, RowHeaderInfo } from '@/types/CalendarComponentTypes';

const breakfastMeals = [
    {
        mealId: '1',
        mealName: 'Cereal',
        mealType: ['breakfast'],
    },
];

const lunchMeals = [
    {
        mealId: '2',
        mealName: 'Sandwich',
        mealType: ['lunch'],
    },
    {
        mealId: '2',
        mealName: 'Sandwich',
        mealType: ['lunch'],
    },
    {
        mealId: '2',
        mealName: 'Sandwich',
        mealType: ['lunch'],
    },
];

const snackMeals = [
    {
        mealId: '3',
        mealName: 'Apple',
        mealType: ['snack'],
    },
];

const mockDaySchedule: FoodDaySchedule = {
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    mealInDays: new Map([
        ['breakfast', breakfastMeals],
        ['lunch', lunchMeals],
        ['snack', snackMeals],
    ]),
    mealInDaysOrder: ['breakfast', 'lunch', 'snack'],
};

const mockScheduleArray = Array.from({ length: 7 }, (_, index) => ({
    ...mockDaySchedule,
    date: new Date(
        mockDaySchedule.date.getDate() + index * 24 * 60 * 60 * 1000
    ),
}));

export const scheduleSliceDefault: IScheduleSliceProps = {
    startingWeekDate: new Date(),
    tableHeaderInfo: {
        fromText: 'From',
        toText: 'To',
    },
    rowHeaderInfo: {
        map: new Map([
            [
                'breakfast',
                {
                    headerText: 'Breakfast',
                    subHeaderText: [],
                },
            ],
            [
                'lunch',
                {
                    headerText: 'Lunch',
                    subHeaderText: ['Main Meal', 'Stir Fry', 'Soup'],
                },
            ],
            [
                'snack',
                {
                    headerText: 'Snack',
                    subHeaderText: [],
                },
            ],
        ]),
    },
    foodSchedules: mockScheduleArray,
};

export const defaultRowHeader: RowHeader = {
    headerText: 'undefined',
    subHeaderText: [],
};
