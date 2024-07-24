import { Grid } from '@mantine/core';
import Cell from '../cells/Cell';
import EditableString from '@/components/utilities/EditableString';
import { memo } from 'react';

interface BreakfastProps {
    breakfastText: string;
    breakfastMeals: {
        mealName: string;
        date: Date;
    }[];
    setBreakfastText: (newText: string) => void;
}

function BreakfastBlock(props: BreakfastProps) {
    //TODO: add editing features
    return (
        <Grid columns={8}>
            <Cell>
                <EditableString
                    text={props.breakfastText}
                    onEditText={props.setBreakfastText}
                />
            </Cell>
            {...props.breakfastMeals.map((meal) => (
                <Cell key={meal.date.toString()}>{meal.mealName}</Cell>
            ))}
        </Grid>
    );
}

export default memo(BreakfastBlock);
