import { Grid } from '@mantine/core';

// for large viewports
export default function WeekView() {
    const datesData = Array.from({length: 7}, () => mockDaySchedule);
    return (
        <>
            <Grid columns = {7}>
                    {...datesData.map(daySchedule => 
                        <Grid.Col span={1}>
                            {daySchedule.breakfast.mealName}
                        </Grid.Col>
                        )}
            </Grid>

            <Grid columns = {7}>
                {...datesData.map(daySchedule => 
                        <Grid.Col span={1}>
                    {elementFromLunch(daySchedule.lunch)}
                        </Grid.Col>
                )}
            </Grid>

            <Grid columns = {7}>
                {...datesData.map(daySchedule => 
                        <Grid.Col span={1}>
                    {daySchedule.snack.mealName}
                        </Grid.Col>
                )}
            </Grid>
        </>

    );
}

const elementFromLunch = (lunch: Lunch) => {
    return (
        <>
        {lunch.is3Course &&
            <>
                {lunch.mainMeal.mealName}
            </>
        }
        {!lunch.is3Course && 
            <> 
                {lunch.mainMeal.mealName}
                {lunch.stirFry?.mealName}
                {lunch.soup?.mealName }
            </>
        }
        </>
    )
}

const mockDaySchedule:FoodDaySchedule = {
    breakfast: {
        mealId: '1',
        mealName: 'Cereal',
        mealType: ['breakfast']
    },
    lunch: {
        is3Course: false,
        mainMeal: {
            mealId: '2',
            mealName: 'Sandwich',
            mealType: ['lunch']
        }
    },
    snack: {
        mealId: '3',
        mealName: 'Apple',
        mealType: ['snack']
    }
}