import { Grid, Paper, UnstyledButton } from '@mantine/core';
import Cell from './Cell';
import EditableString from '@/components/utilities/EditableString';
import { createRef, memo, RefObject, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { Meal, placeholderMeal } from '@/types/FoodSchedulingTypes';
import { RowHeader } from '@/types/CalendarComponentTypes';
import { headers } from 'next/headers';

import classes from '@/components/calendar/calendarStyles.module.css';

interface CourseMealProps {
    headers: RowHeader;
    mealsEachDate: {
        meals: Meal[];
        date: Date;
    }[];
    setHeaderText: (newHeaders: RowHeader) => void;
    onMealPress: (meals: Meal[], date: Date) => void;
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

    console.log(props.mealsEachDate[0].meals);

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
            {...props.mealsEachDate.map((daySchedule) => (
                <Cell key={daySchedule.date.toString()}>
                    <MultipleMeals
                        meals={daySchedule.meals}
                        onMealPress={() =>
                            props.onMealPress(
                                daySchedule.meals,
                                daySchedule.date
                            )
                        }
                    />
                </Cell>
            ))}
        </Grid>
    );
}

const MultipleMeals = ({
    meals,
    onMealPress,
}: {
    meals: Meal[];
    onMealPress: (meals: Meal[]) => void;
}) => {
    console.log(meals);
    return (
        <div>
            <UnstyledButton
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
                onClick={() => onMealPress(meals)}
            >
                <div>
                    {...meals.map((mealElement) => (
                        <Paper
                            key={mealElement.mealId}
                            className={classes.paperInCellWithMinSize}
                        >
                            {mealElement.mealName}
                        </Paper>
                    ))}
                </div>
            </UnstyledButton>
        </div>
    );
};

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
