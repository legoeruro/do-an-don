type foodDaySchedule = {
    breakfast: meal,
    lunch: lunch,
    snack: meal, 
}

type meal = {
    mealId: string,
    mealName: string,
    mealType: string[]
}

// mirror database setup
type lunch = {
    is3Course: boolean,
    mainMeal: meal,
    stirFry?: meal,
    soup?: meal
}