import { Meal } from '@/types/FoodSchedulingTypes';

// Returning a map so that the mealId can be used as the key in selection boxes
export const mealListToMap = (mealList: Meal[]) => {
    return new Map(mealList.map((meal) => [meal.mealId, meal]));
};
