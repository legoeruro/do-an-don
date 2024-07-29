'use client';

import { Meal, mealTypeOptions, MealTypes } from '@/types/FoodSchedulingTypes';
import { Button, Paper, Select } from '@mantine/core';
import classes from '@/components/calendar/WeekView/popupWindow/cardStyles.module.css';
import { propagateServerField } from 'next/dist/server/lib/render-server';
import { useEffect, useState } from 'react';
import { fetchMealList } from '@/utils/fetch';
import { isEqual } from 'lodash';

interface IMealItemCardProps {
    meal: Meal;
    defaultMealList: Meal[];
    selectedType: MealTypes;
    onDelete: () => void;
    onChangeMeal: (meal: Meal | undefined) => void;
}

export default function MealItemCard(props: IMealItemCardProps) {
    const [mealType, setMealType] = useState<MealTypes | undefined>(undefined);
    const [lastMealType, setLastMealType] = useState<MealTypes | undefined>(
        undefined
    );

    const [mealList, setMealList] = useState<Meal[]>();
    useEffect(() => {
        setMealList(props.defaultMealList);
    }, [props.defaultMealList]);
    const setMealListWithMealType = (mealType: MealTypes) => {
        setMealType(undefined);
        fetchMealList(mealType).then((data) => setMealList(data));
    };

    //FEATURE: set mealIndex in a better way to be less laggy
    const mealIndex = mealList?.find((meal) => isEqual(meal, props.meal));
    // const [mealIndex, setMealIndex] = useState<number | undefined>(undefined);

    return (
        <Paper className={classes.card}>
            <div
                key="line button to right"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button onClick={() => props.onDelete()}>x</Button>
            </div>
            <Select
                label="Meal Type"
                placeholder="Select a meal type"
                data={mealTypeOptions}
                value={mealType}
                onChange={(value) => {
                    setMealType(value ?? undefined);
                    if (mealType && !props.meal.mealType.includes(mealType)) {
                        setMealListWithMealType(mealType);
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
                    mealList?.map((meal, index) => ({
                        value: index.toString(),
                        label: meal.mealName,
                    })) ?? []
                }
                value={mealIndex?.toString()}
                onChange={(value) => {
                    const meal = mealList?.[parseInt(value ?? '0', 10)];
                    props.onChangeMeal(meal);
                }}
                clearable
                searchable
                required
            />
        </Paper>
    );
}
