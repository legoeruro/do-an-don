import { Grid, UnstyledButton } from '@mantine/core';
import Cell from './Cell';
import EditableString from '@/components/utilities/EditableString';
import { memo } from 'react';
import { isEqual } from 'lodash';
import { Meal, MealInDayOptions } from '@/types/FoodSchedulingTypes';
import TextOnlyCell from './TextOnlyCell';

interface SingleMealProps {
    headerText: string;
    meals: {
        meal: Meal;
        date: Date;
    }[];
    onMealPress: (meal: Meal, date: Date) => void;
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
            {...props.meals.map((mealElement) => (
                <Cell key={mealElement.date.toString()}>
                    <UnstyledButton
                        style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                        }}
                        onClick={() =>
                            props.onMealPress(
                                mealElement.meal,
                                mealElement.date
                            )
                        }
                    >
                        {mealElement?.meal?.mealName}
                    </UnstyledButton>
                </Cell>
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
