import { TableHeaderInfo, RowHeaderInfo } from "@/types/CalendarComponentTypes";
import { FoodDaySchedule } from "@/types/foodSchedulingTypes";
import { StateCreator } from "zustand";

export interface IScheduleSliceProps {
    startingWeekDate: Date;
    tableHeaderInfo: TableHeaderInfo;
    rowHeaderInfo: RowHeaderInfo;
    foodSchedules: FoodDaySchedule[];
}

export interface IScheduleSlice extends IScheduleSliceProps {
    updateDateInfo: (newDate: Date) => void;
    updateTableHeaderInfo: (newHeader: TableHeaderInfo) => void;
    updateRowHeaderInfo: (newRow: RowHeaderInfo) => void;
    updateFoodSchedule: (
        index: number,
        newFoodSchedule: FoodDaySchedule
    ) => void;
}

export const createScheduleSlice: StateCreator<IScheduleSlice> = (
    set,
    get
) => ({
    startingWeekDate: new Date(),
    tableHeaderInfo: {
        fromText: "From",
        toText: "To",
    },
    rowHeaderInfo: {
        breakfastText: "Breakfast",
        lunchText: "Lunch",
        mainMealText: "Main Meal",
        stirFryText: "Stir Fry",
        soupText: "Soup",
        snackText: "Snack",
    },
    foodSchedules: [],

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
    updateRowHeaderInfo: (newRow: RowHeaderInfo) => {
        set(() => ({
            rowHeaderInfo: newRow,
        }));
        //TODO: update in user preference database
    },
    updateFoodSchedule: (index: number, newFoodSchedule: FoodDaySchedule) => {
        set((state) => ({
            foodSchedules: state.foodSchedules.map((schedule, i) =>
                i === index ? newFoodSchedule : schedule
            ),
        }));
        //TODO: update in  database
    },
});
