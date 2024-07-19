import { Grid, GridCol, Paper, Input } from '@mantine/core';
import { useState, memo } from 'react';

import { DateInfo, RowHeaderInfo } from '../../types/CalendarComponentTypes';
import EditableString from '../misc/EditableString';

import Cell from './cells/Cell';

interface weekViewProps {
    dateInfo: DateInfo
}

// for large viewports
const WeekView = memo((props: weekViewProps) => {
    const datesData = Array.from({length: 7}, () => ({...mockDaySchedule, date: new Date(Date.now() + Math.random() * 1000000000)}));

    const defaultRowHeaderInfo: RowHeaderInfo = {
        breakfastText: 'Breakfast',
        lunchText: 'Lunch',
        mainMealText: 'Main Meal',
        stirFryText: 'Stir Fry',
        soupText: 'Soup',
        snackText: 'Snack'
    };

    const [headerInfo, setHeaderInfo] = useState(defaultRowHeaderInfo);
    const [testText, setText] = useState("test");

    // For unnecessary rerendering
    interface BreakfastProps {
        breakfastText: string,
        breakfastMeals: {
            mealName: string,
            date: Date
        }[]
    }
    const BreakfastBlock = memo( (props: BreakfastProps) => 
        <Grid columns = {8}>
                <Cell>
                    <EditableString 
                        text={props.breakfastText}
                        onEditText={(newText) => setHeaderInfo({...headerInfo, breakfastText: newText})}
                    />
                </Cell>
                {...props.breakfastMeals.map(meal => 
                    <Cell key={meal.date.toString()}>
                        {
                            meal.mealName
                        }
                    </Cell>
                    )}
        </Grid>
    , (prevProps, nextProps) => {
        console.log(prevProps);
        console.log(nextProps);
        return (
         prevProps.breakfastText == nextProps.breakfastText 
         && (prevProps.breakfastMeals.reduce(
            (acc, meal, index) => 
            acc && meal.mealName === nextProps.breakfastMeals[index].mealName, true))
        )
        }
    );



    const LunchBlock = memo( () =>
        <Grid columns = {8}>
                <Cell>
                    <Grid columns = {2}>
                        <Grid.Col span={1}>
                            <Paper shadow='xs'>
                                <EditableString 
                                    text={headerInfo.lunchText}
                                    onEditText={(newText) => setHeaderInfo({...headerInfo, lunchText: newText})}
                                />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Paper shadow='xs'>
                                <EditableString 
                                    text={headerInfo.mainMealText}
                                    onEditText={(newText) => setHeaderInfo({...headerInfo, mainMealText: newText})}
                                />
                            </Paper>
                            <Paper shadow='xs'>
                                <EditableString 
                                    text={headerInfo.stirFryText}
                                    onEditText={(newText) => setHeaderInfo({...headerInfo, stirFryText: newText})}
                                />
                            </Paper>
                            <Paper shadow='xs'>
                                <EditableString 
                                    text={headerInfo.soupText}
                                    onEditText={(newText) => setHeaderInfo({...headerInfo, soupText: newText})}
                                />
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Cell>
                {...datesData.map(daySchedule => 
                        <Cell key={daySchedule.date.toString()}>
                            <ElementFromLunch lunch={daySchedule.lunch}/>
                        </Cell>
                )}
            </Grid>
    )

    const SnackBlock = memo( () =>
        <Grid columns = {8}>
            <Cell>
                    <EditableString 
                        text={headerInfo.snackText}
                        onEditText={(newText) => setHeaderInfo({...headerInfo, snackText: newText})}
                    />
            </Cell>
            {...datesData.map(daySchedule => 
                        <Cell key={daySchedule.date.toString()}>
                            {daySchedule.snack.mealName}
                        </Cell>
            )}
        </Grid>
    )
    
    return (
        <>
        <div>
            <h1>Week View</h1>
            test
            <Input 
                value={testText}
                onChange={(event) => setText(event.currentTarget.value)} 
            />
        </div>
            <ColTitle dateInfo={props.dateInfo} />
            <GridOfDates isBeginningSpaced={true}/>

            <BreakfastBlock
                breakfastText={headerInfo.breakfastText}
                breakfastMeals={datesData.map(daySchedule => ({mealName: daySchedule.breakfast.mealName, date: daySchedule.date}))}    
            />
            <LunchBlock/>
            <SnackBlock/>
        </>

    );
});



const ColTitle = memo(({dateInfo, }: {dateInfo: DateInfo}) => {
    return (
        <Paper shadow='xs'>
            Schedule from {dateInfo.from.toLocaleDateString("vi-VN")} to {dateInfo.to.toLocaleDateString("vi-VN")}    
        </Paper>
    )
})

const datesOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// defaults to monday as starting date

interface gridDateProps {
    isBeginningSpaced: boolean
}
const GridOfDates = memo((props: gridDateProps) => {
    return (
        <Grid columns = {8}>
            {props.isBeginningSpaced && <GridCol span={1}></GridCol>}
            {...datesOfWeek.map(day => <Cell key={day}>{day}</Cell>)}
        </Grid>)
})

interface elementFromLunchProps {
    lunch: Lunch
}
const ElementFromLunch = memo((props: elementFromLunchProps) => {
    return (
        <>
        {props.lunch.is3Course &&
            <>
                {props.lunch.mainMeal.mealName}
            </>
        }
        {!props.lunch.is3Course && 
            <> 
                {props.lunch.mainMeal.mealName}
                {props.lunch.stirFry?.mealName}
                {props.lunch.soup?.mealName }
            </>
        }
        </>
    )
})

const mockDaySchedule:FoodDaySchedule = {
    date: new Date(),
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


export default WeekView;