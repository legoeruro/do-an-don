import { Meal, MealTypes } from '@/types/FoodSchedulingTypes';

export const fetchMealList = async (mealType?: MealTypes) => {
    //TODO: replace this placeholder with data from backend
    //TODO: reduce call to backend

    if (!mealType) return mockMealList;
    return mockMealList.filter((meal) => meal.mealType.includes(mealType));
};

const mockMealList: Meal[] = [
    {
        mealId: '1',
        mealName: 'Cereal',
        mealType: ['breakfast', 'snack'],
    },
    {
        mealId: '2',
        mealName: 'Sandwich',
        mealType: ['main', 'breakfast'],
    },
    {
        mealId: '3',
        mealName: 'Apple',
        mealType: ['snack'],
    },
    {
        mealId: '4',
        mealName: 'Spaghetti',
        mealType: ['main'],
    },
    {
        mealId: '5',
        mealName: 'Fries',
        mealType: ['side'],
    },
    {
        mealId: '6',
        mealName: 'Pear',
        mealType: ['snack'],
    },
];
