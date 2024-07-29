import { MealInDayOptions } from './FoodSchedulingTypes';

export type TableHeaderInfo = {
    fromText: string;
    toText: string;
};

export type RowHeader = {
    headerText: string;
    subHeaderText: string[];
};

export type RowHeaderInfo = { map: Map<MealInDayOptions, RowHeader> };
