import { Grid } from '@mantine/core';
import Cell from './Cell';
import EditableString from '@/components/utilities/EditableString';
import { memo } from 'react';
import { isEqual } from 'lodash';

interface SingleMealProps {
    headerText: string;
    meals: {
        mealName: string;
        date: Date;
    }[];
    setHeaderText: (newText: string) => void;
}

function SingleMealBlock(props: SingleMealProps) {
    //TODO: add editing features
    console.log(props.headerText);
    return (
        <Grid columns={8}>
            <Cell>
                <EditableString
                    text={props.headerText}
                    onEditText={props.setHeaderText}
                    disabled={true}
                />
            </Cell>
            {...props.meals.map((meal) => (
                <Cell key={meal.date.toString()}>{meal.mealName}</Cell>
            ))}
        </Grid>
    );
}

// export default memo(SingleMealBlock, (prevProps, nextProps) => {
//     return (
//         prevProps.headerText === nextProps.headerText &&
//         isEqual(prevProps.meals, nextProps.meals)
//     );
// });
export default SingleMealBlock;
