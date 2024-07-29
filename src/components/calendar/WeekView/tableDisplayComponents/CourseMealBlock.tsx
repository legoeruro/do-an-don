import { Grid, Paper } from '@mantine/core';
import Cell from './Cell';
import EditableString from '@/components/utilities/EditableString';
import { memo } from 'react';
import { isEqual } from 'lodash';
import { Meal } from '@/types/FoodSchedulingTypes';
import { RowHeader } from '@/types/CalendarComponentTypes';
import { headers } from 'next/headers';

interface CourseMealProps {
    headers: RowHeader;
    mealsEachDate: {
        meals: Meal[];
        date: Date;
    }[];
    setHeaderText: (newHeaders: RowHeader) => void;
}

function CourseMealBlock(props: CourseMealProps) {
    //TODO: add editing features
    //TODO: replace disabled with editing feature (and make sure it doesn't lag)
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
                    <MultipleMeals lunch={daySchedule.meals} />
                </Cell>
            ))}
        </Grid>
    );
}

const MultipleMeals = ({ lunch }: { lunch: Meal[] }) => {
    return (
        <>
            {/* {!lunch.is3Course && <>{lunch.meal1.mealName}</>}
            {lunch.is3Course && (
                <>
                    {lunch.meal1.mealName}
                    {lunch.meal2?.mealName}
                    {lunch.meal3?.mealName}
                </>
            )} */}
        </>
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
