import { mockMealList } from '@/stores/defaultValues/scheduleDefaultInfo';
import { Dish, DishTypes } from '@/types/FoodSchedulingTypes';

export const fetchDishesList = async (type?: DishTypes) => {
    //TODO: replace this placeholder with data from backend
    //TODO: reduce call to backend

    if (!type) return mockMealList;
    return mockMealList.filter((meal) => meal.dishType.includes(type));
};
