'use client';

import { Dish, dishTypesOptions, DishTypes } from '@/types/FoodSchedulingTypes';
import { UnstyledButton, Paper, Select, Button } from '@mantine/core';
import classes from '@/components/calendar/calendarStyles.module.css';
import { propagateServerField } from 'next/dist/server/lib/render-server';
import { useEffect, useState } from 'react';
import { fetchMealList } from '@/utils/fetch';
import { isEqual } from 'lodash';
import { dishesListToMap } from '@/utils/arrays';

interface IMealItemCardProps {
    key: string;
    dish: Dish;
    defaultDishesListMap: Map<string, Dish> | undefined;
    onDelete: () => void;
    onChange: (dish: Dish | undefined) => void;
}

export default function MealItemCard(props: IMealItemCardProps) {
    const [dishType, setDishType] = useState<DishTypes | undefined>(undefined);

    //for displaying loading skeleton when mealList is being fetched
    const [dishesListMap, setDishesListMap] = useState<Map<string, Dish>>();
    const [oldDishType, setOldDishType] = useState<DishTypes | undefined>(
        undefined
    );

    const dishesList = Array.from(
        dishesListMap ?? [],
        ([_name, value]) => value
    );

    useEffect(() => {
        setDishesListMap(props.defaultDishesListMap);
    }, [props.defaultDishesListMap]);
    const setMealListMapWithdishType = async (dishType: DishTypes) => {
        fetchMealList(dishType).then((data) => {
            setDishesListMap(dishesListToMap(data));
            setOldDishType(dishType);
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
                    label="Dish Type"
                    placeholder="Select a dish type"
                    data={dishTypesOptions}
                    value={dishType}
                    onChange={(value) => {
                        setDishType(value ?? undefined);
                        console.log(value);
                        console.log(dishType);
                        if (value && !props.dish.dishType?.includes(value)) {
                            setMealListMapWithdishType(value);
                            props.onChange(undefined);
                        }
                    }}
                    clearable
                    searchable
                />
                <Select
                    label="Dish Name"
                    placeholder="Select or search a dish"
                    data={
                        dishesList?.map((dish) => ({
                            value: dish.dishId,
                            label: dish.dishName,
                        })) ?? []
                    }
                    value={props.dish.dishId}
                    onChange={(value) => {
                        const dish = dishesListMap?.get(value ?? '');
                        props.onChange(dish);
                    }}
                    clearable
                    searchable
                    required
                />
            </div>
        </Paper>
    );
}
