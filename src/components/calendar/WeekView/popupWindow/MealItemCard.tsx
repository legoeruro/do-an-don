'use client';

import { Meal, mealTypeOptions, MealTypes } from '@/types/FoodSchedulingTypes';
import { UnstyledButton, Paper, Select, Button } from '@mantine/core';
import classes from '@/components/calendar/calendarStyles.module.css';
import { propagateServerField } from 'next/dist/server/lib/render-server';
import { useEffect, useState } from 'react';
import { fetchMealList } from '@/utils/fetch';
import { isEqual } from 'lodash';
import { mealListToMap } from '@/utils/arrays';

interface IMealItemCardProps {
    key: string;
    meal: Meal;
    defaultMealListMap: Map<string, Meal> | undefined;
    onDelete: () => void;
    onChangeMeal: (meal: Meal | undefined) => void;
}

export default function MealItemCard(props: IMealItemCardProps) {
    const [mealType, setMealType] = useState<MealTypes | undefined>(undefined);

    //for displaying loading skeleton when mealList is being fetched
    const [mealListMealType, setMealListMealType] = useState<
        MealTypes | undefined
    >(undefined);

    const [mealListMap, setMealListMap] = useState<Map<string, Meal>>();
    const mealList = Array.from(mealListMap ?? [], ([_name, value]) => value);

    useEffect(() => {
        setMealListMap(props.defaultMealListMap);
    }, [props.defaultMealListMap]);
    const setMealListMapWithMealType = async (mealType: MealTypes) => {
        fetchMealList(mealType).then((data) => {
            setMealListMap(mealListToMap(data));
            setMealListMealType(mealType);
        });
    };

    return (
        <Paper className={classes.card}>
            <div
                key="line button to right"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button onClick={() => props.onDelete()}>X</Button>
            </div>
            <div>
                <Select
                    label="Meal Type"
                    placeholder="Select a meal type"
                    data={mealTypeOptions}
                    value={mealType}
                    onChange={(value) => {
                        setMealType(value ?? undefined);
                        console.log(value);
                        console.log(mealType);
                        if (value && !props.meal.mealType?.includes(value)) {
                            setMealListMapWithMealType(value);
                            props.onChangeMeal(undefined);
                        }
                    }}
                    clearable
                    searchable
                />
                <Select
                    label="Meal Name"
                    placeholder="Select or search a meal"
                    data={
                        mealList?.map((meal) => ({
                            value: meal.mealId,
                            label: meal.mealName,
                        })) ?? []
                    }
                    value={props.meal.mealId}
                    onChange={(value) => {
                        const meal = mealListMap?.get(value ?? '');
                        props.onChangeMeal(meal);
                    }}
                    clearable
                    searchable
                    required
                />
            </div>
        </Paper>
    );
}
