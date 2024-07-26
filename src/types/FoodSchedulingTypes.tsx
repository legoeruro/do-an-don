export type FoodDaySchedule = {
    date: Date;
    breakfast: Meal;
    lunch: Lunch;
    snack: Meal;
};

export type MealInDay = 'breakfast' | 'lunch' | 'snack';

export type Meal = {
    mealId: string;
    mealName: string;
    mealType: MealTypes;
};

// mirror database setup
export type Lunch = {
    is3Course: boolean;
    meal1: Meal;
    meal2?: Meal;
    meal3?: Meal;
};

export const mealTypeOptions = [
    'drink',
    'side',
    'main',
    'breakfast',
    'stirFry',
    'soup',
    'snack',
];
export type MealTypes = (typeof mealTypeOptions)[number];
