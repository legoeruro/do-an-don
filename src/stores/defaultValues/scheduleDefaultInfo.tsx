import { Dish, FoodDaySchedule } from '@/types/FoodSchedulingTypes';
import { IScheduleSliceProps } from '../scheduleSlice';
import { RowHeader, RowHeaderInfo } from '@/types/CalendarComponentTypes';

const breakfastMeals = [
    {
        dishId: '1',
        dishName: 'Cereal',
        dishType: ['breakfast'],
    },
];

const lunchMeals = [
    {
        dishId: '2',
        dishName: 'Sandwich',
        dishType: ['lunch'],
    },
    {
        dishId: '2',
        dishName: 'Sandwich',
        dishType: ['lunch'],
    },
    {
        dishId: '2',
        dishName: 'Sandwich',
        dishType: ['lunch'],
    },
];

const snackMeals = [
    {
        dishId: '3',
        dishName: 'Apple',
        dishType: ['snack'],
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

export const mockMealList: Dish[] = [
    {
        dishId: '1',
        dishName: 'Cereal',
        dishType: ['breakfast', 'snack'],
    },
    {
        dishId: '2',
        dishName: 'Sandwich',
        dishType: ['main', 'breakfast'],
    },
    {
        dishId: '3',
        dishName: 'Apple',
        dishType: ['snack'],
    },
    {
        dishId: '4',
        dishName: 'Spaghetti',
        dishType: ['main'],
    },
    {
        dishId: '5',
        dishName: 'Fries',
        dishType: ['side'],
    },
    {
        dishId: '6',
        dishName: 'Pear',
        dishType: ['snack'],
    },
    {
        dishId: '7',
        dishName: 'Special multi-course meal with many discourses',
        dishType: ['snack'],
    },
];

export const defaultRowHeader: RowHeader = {
    headerText: 'undefined',
    subHeaderText: [],
};
