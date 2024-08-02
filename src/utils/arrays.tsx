import { Dish } from '@/types/FoodSchedulingTypes';

// Returning a map so that the mealId can be used as the key in selection boxes
export const dishesListToMap = (mealList: Dish[]) => {
    return new Map(mealList.map((meal) => [meal.dishId, meal]));
};
