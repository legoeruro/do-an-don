import { Button, Grid, Paper, UnstyledButton } from '@mantine/core';
import Cell from './Cell';
import EditableString from '@/components/utilities/EditableString';
import { createRef, memo, RefObject, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { Dish, placeholderDish } from '@/types/FoodSchedulingTypes';
import { RowHeader } from '@/types/CalendarComponentTypes';
import { headers } from 'next/headers';

import classes from '@/components/calendar/calendarStyles.module.css';

interface CourseMealProps {
    headers: RowHeader;
    dishesInDate: {
        dishes: Dish[];
        date: Date;
    }[];
    setHeaderText: (newHeaders: RowHeader) => void;
    onMealPress: (dish: Dish[], date: Date) => void;
}

function CourseMealBlock(props: CourseMealProps) {
    //TODO: add editing features
    //TODO: replace disabled with editing feature (and make sure it doesn't lag)

    //TODO: add item heights auto scaling
    // const [itemHeights, setItemHeights] = useState<number[]>([]);
    // const foodItemRefs = Array.from(
    //     { length: props.mealsEachDate.length },
    //     () => createRef<HTMLDivElement>()
    // );
    // const foodItemHeights = foodItemRefs.map(
    //     (ref) => ref.current?.clientHeight ?? 0
    // );

    console.log(props.dishesInDate[0].dishes);

    return (
        <Grid columns={8}>
            <Cell>
                <Grid columns={2}>
                    <Grid.Col span={1}>
                        <Paper shadow="xs">
                            <EditableString
                                text={props.headers.headerText}
                                onEditText={(newText) =>
                                    props.setHeaderText({
                                        ...props.headers,
                                        headerText: newText,
                                    })
                                }
                                disabled={true}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        {props.headers.subHeaderText.map((mealTexts, index) => (
                            <Paper key="index" shadow="xs">
                                <EditableString
                                    text={mealTexts}
                                    onEditText={(newText) =>
                                        props.setHeaderText({
                                            ...props.headers,
                                            subHeaderText:
                                                props.headers.subHeaderText.with(
                                                    index,
                                                    newText
                                                ),
                                        })
                                    }
                                    disabled={true}
                                />
                            </Paper>
                        ))}
                    </Grid.Col>
                </Grid>
            </Cell>
            {...props.dishesInDate.map((daySchedule) => (
                <Cell key={daySchedule.date.toString()}>
                    <MultipleDishes
                        dishes={daySchedule.dishes}
                        onDishesPress={() =>
                            props.onMealPress(
                                daySchedule.dishes,
                                daySchedule.date
                            )
                        }
                    />
                </Cell>
            ))}
        </Grid>
    );
}

const MultipleDishes = ({
    dishes,
    onDishesPress,
}: {
    dishes: Dish[];
    onDishesPress: (dishes: Dish[]) => void;
}) => {
    return (
        <div>
            <UnstyledButton
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
                onClick={() => onDishesPress(dishes)}
                component="p"
            >
                <DishesAsPaperMemo dishes={dishes} />
            </UnstyledButton>
        </div>
    );
};

// upon changing list of dishes, old items are not deleted and new items are added spmetimes
// this is because the key is not unique. Mental note: key should always be unique
const DishesAsPaper = ({ dishes }: { dishes: Dish[] }) => {
    return (
        <div>
            {' '}
            {...dishes.map((dish, index) => {
                console.log(dish.dishName);
                return (
                    <Paper
                        key={index}
                        className={classes.paperInCellWithMinSize}
                    >
                        {dish.dishName}
                    </Paper>
                );
            })}
        </div>
    );
};

const DishesAsPaperMemo = memo(DishesAsPaper, (prevProps, nextProps) => {
    return isEqual(prevProps.dishes, nextProps.dishes);
});

// export default memo(CourseMealBlock, (prevProps, nextProps) => {
//     return (
//         prevProps.headerText === nextProps.headerText &&
//         prevProps.meal1Text === nextProps.meal1Text &&
//         prevProps.meal2Text === nextProps.meal2Text &&
//         prevProps.meal3Text === nextProps.meal3Text &&
//         isEqual(prevProps.meals, nextProps.meals)
//     );
// });

export default CourseMealBlock;
