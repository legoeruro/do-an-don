import { Grid, GridCol, Paper } from '@mantine/core';
import { useState } from 'react';

import { DateInfo, RowHeaderInfo } from '../../types/CalendarComponentTypes';
import EditableString from '../misc/EditableString';

import classes from './calendarStyles.module.css';
import Cell from './cells/Cell';

interface weekViewProps {
    dateInfo: DateInfo
}

// for large viewports
export default function WeekView(props: weekViewProps) {
    const datesData = Array.from({length: 7}, () => mockDaySchedule);

    const defaultRowHeaderInfo: RowHeaderInfo = {
        breakfastText: 'Breakfast',
        lunchText: 'Lunch',
        mainMealText: 'Main Meal',
        stirFryText: 'Stir Fry',
        soupText: 'Soup',
        snackText: 'Snack'
    };

    const [headerInfo, setHeaderInfo] = useState(defaultRowHeaderInfo);
    
    return (
        <>
            <ColTitle dateInfo={props.dateInfo} />
            <GridOfDates/>
            <Grid columns = {8}>
                    <Grid.Col span={1}>
                        <Paper shadow='xs'>
                            <EditableString 
                                text={headerInfo.breakfastText}
                                onEditText={(newText) => setHeaderInfo({...headerInfo, breakfastText: newText})}
                            />
                        </Paper>
                    </Grid.Col>
                    {...datesData.map(daySchedule => 
                        <Cell>
                            {daySchedule.breakfast.mealName}
                        </Cell>
                        )}
            </Grid>

            <Grid columns = {8}>
                <Grid.Col span={1}>
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
                </Grid.Col>
                {...datesData.map(daySchedule => 
                        <Cell>
                            {elementFromLunch(daySchedule.lunch)}
                        </Cell>
                )}
            </Grid>

            <Grid columns = {8}>
                <Grid.Col span={1}>
                    <Paper shadow='xs'>
                        <EditableString 
                            text={headerInfo.snackText}
                            onEditText={(newText) => setHeaderInfo({...headerInfo, snackText: newText})}
                        />
                    </Paper>
                </Grid.Col>
                {...datesData.map(daySchedule => 
                            <Cell>
                                {daySchedule.snack.mealName}
                            </Cell>
                )}
            </Grid>
        </>

    );
}



const ColTitle = ({dateInfo, }: {dateInfo: DateInfo}) => {
    return (
        <Paper shadow='xs'>
            Schedule from {dateInfo.from.toLocaleDateString("vi-VN")} to {dateInfo.to.toLocaleDateString("vi-VN")}    
        </Paper>
    )
}

const datesOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// defaults to monday as starting date
const GridOfDates = () => {
    return (
        <Grid columns = {8}>
            {...datesOfWeek.map(day => <GridCol span={1}>{day}</GridCol>)}
        </Grid>)
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