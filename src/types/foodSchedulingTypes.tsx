export type FoodDaySchedule = {
    date: Date,
    breakfast: Meal,
    lunch: Lunch,
    snack: Meal, 
}

export type Meal = {
    mealId: string,
    mealName: string,
    mealType: string[]
}

// mirror database setup
export type Lunch = {
    is3Course: boolean,
    mainMeal: Meal,
    stirFry?: Meal,
    soup?: Meal
}