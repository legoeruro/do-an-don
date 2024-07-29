import {
    TableHeaderInfo,
    RowHeaderInfo,
    RowHeader,
} from '@/types/CalendarComponentTypes';
import {
    FoodDaySchedule,
    Meal,
    MealInDayOptions,
} from '@/types/FoodSchedulingTypes';
import { StateCreator } from 'zustand';
import { scheduleSliceDefault } from './defaultValues/scheduleSliceDefault';

export interface IScheduleSliceProps {
    startingWeekDate: Date;
    tableHeaderInfo: TableHeaderInfo;
    rowHeaderInfo: RowHeaderInfo;
    foodSchedules: FoodDaySchedule[];
}

export interface IScheduleSlice extends IScheduleSliceProps {
    updateDateInfo: (newDate: Date) => void;
    updateTableHeaderInfo: (newHeader: TableHeaderInfo) => void;
    updateRowHeaderInfo: (
        mealInDay: MealInDayOptions,
        newRowHeader: RowHeader
    ) => void;
    updateFoodSchedule: (
        date: Date,
        mealInDay: MealInDayOptions,
        newMeals: Meal[]
    ) => void;
}

export const createScheduleSlice: StateCreator<IScheduleSlice> = (
    set,
    get
) => ({
    ...scheduleSliceDefault,

    updateDateInfo: (newDate: Date) => {
        set(() => ({
            startingWeekDate: newDate,
        }));
        //TODO: update food schedules
    },
    updateTableHeaderInfo: (newHeader: TableHeaderInfo) => {
        set(() => ({
            tableHeaderInfo: {
                fromText: newHeader.fromText,
                toText: newHeader.toText,
            },
        }));
        //TODO: update in user preference database
    },
    updateRowHeaderInfo: (
        mealInDay: MealInDayOptions,
        rowHeader: RowHeader
    ) => {
        set((state) => ({
            rowHeaderInfo: {
                map: new Map(state.rowHeaderInfo.map).set(mealInDay, rowHeader),
            },
        }));
        //TODO: update in user preference database
    },
    updateFoodSchedule: (
        date: Date,
        mealInDay: MealInDayOptions,
        newMeals: Meal[]
    ) => {
        set((state) => ({
            foodSchedules: state.foodSchedules.map((schedule) =>
                schedule.date.getDate() === date.getDate()
                    ? {
                          ...schedule,
                          mealInDays: new Map(schedule.mealInDays).set(
                              mealInDay,
                              newMeals
                          ),
                      }
                    : schedule
            ),
        }));
        //TODO: update in  database
    },
});
