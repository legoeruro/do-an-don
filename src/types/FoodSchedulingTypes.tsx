export type FoodDaySchedule = {
    date: Date;
    mealInDays: Map<MealInDayOptions, Meal[]>;
    mealInDaysOrder: MealInDayOptions[];
};

export const exampleMealInDayOptions = ['breakfast', 'lunch', 'snack'];
//User-defined
export type MealInDayOptions = String;

export type Meal = {
    mealId: string;
    mealName: string;
    mealType: MealTypes[];
};

//TODO: Change this to user-defined (string)
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

export const placeholderMeal: Meal = {
    mealId: '-1',
    mealName: 'undefined',
    mealType: [mealTypeOptions[0]],
};
