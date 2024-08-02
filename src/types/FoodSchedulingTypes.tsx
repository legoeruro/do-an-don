export type FoodDaySchedule = {
    date: Date;
    mealInDays: Map<MealInDayOptions, Dish[]>;
    mealInDaysOrder: MealInDayOptions[];
};

export const exampleMealInDayOptions = ['breakfast', 'lunch', 'snack'];
//User-defined
export type MealInDayOptions = String;

export type Dish = {
    dishId: string;
    dishName: string;
    dishType: DishTypes[];
};

//TODO: Change this to user-defined (string)
export const dishTypesOptions = [
    'drink',
    'side',
    'main',
    'breakfast',
    'stirFry',
    'soup',
    'snack',
];
export type DishTypes = (typeof dishTypesOptions)[number];

export const placeholderDish: Dish = {
    dishId: '-1',
    dishName: 'undefined',
    dishType: [dishTypesOptions[0]],
};
