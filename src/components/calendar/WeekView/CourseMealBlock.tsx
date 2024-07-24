import { Grid, Paper } from '@mantine/core';
import Cell from '../cells/Cell';
import EditableString from '@/components/utilities/EditableString';
import { memo } from 'react';
import { isEqual } from 'lodash';
import { Lunch, Meal } from '@/types/foodSchedulingTypes';

interface CourseMealProps {
    headerText: string;
    meal1Text: string;
    meal2Text: string;
    meal3Text: string;
    meals: {
        lunch: Lunch;
        date: Date;
    }[];
    setHeaderText: (newText: {}) => void;
}

function CourseMealBlock(props: CourseMealProps) {
    //TODO: add editing features
    return (
        <Grid columns={8}>
            <Cell>
                <Grid columns={2}>
                    <Grid.Col span={1}>
                        <Paper shadow="xs">
                            <EditableString
                                text={props.headerText}
                                onEditText={(newText) =>
                                    props.setHeaderText({
                                        lunchText: newText,
                                    })
                                }
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Paper shadow="xs">
                            <EditableString
                                text={props.meal1Text}
                                onEditText={(newText) =>
                                    props.setHeaderText({
                                        meal1Text: newText,
                                    })
                                }
                            />
                        </Paper>
                        <Paper shadow="xs">
                            <EditableString
                                text={props.meal2Text}
                                onEditText={(newText) =>
                                    props.setHeaderText({
                                        meal2Text: newText,
                                    })
                                }
                            />
                        </Paper>
                        <Paper shadow="xs">
                            <EditableString
                                text={props.meal3Text}
                                onEditText={(newText) =>
                                    props.setHeaderText({
                                        meal3Text: newText,
                                    })
                                }
                            />
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Cell>
            {...props.meals.map((daySchedule) => (
                <Cell key={daySchedule.date.toString()}>
                    <ElementFromLunch lunch={daySchedule.lunch} />
                </Cell>
            ))}
        </Grid>
    );
}

const ElementFromLunch = ({ lunch }: { lunch: Lunch }) => {
    return (
        <>
            {!lunch.is3Course && <>{lunch.meal1.mealName}</>}
            {lunch.is3Course && (
                <>
                    {lunch.meal1.mealName}
                    {lunch.meal2?.mealName}
                    {lunch.meal3?.mealName}
                </>
            )}
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
