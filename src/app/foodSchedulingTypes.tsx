type FoodDaySchedule = {
    date: Date,
    breakfast: Meal,
    lunch: Lunch,
    snack: Meal, 
}

type Meal = {
    mealId: string,
    mealName: string,
    mealType: string[]
}

// mirror database setup
type Lunch = {
    is3Course: boolean,
    mainMeal: Meal,
    stirFry?: Meal,
    soup?: Meal
}