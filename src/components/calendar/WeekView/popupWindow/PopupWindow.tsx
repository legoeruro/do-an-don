'use client';
import {
    Meal,
    mealTypeOptions,
    MealTypes,
    placeholderMeal,
} from '@/types/FoodSchedulingTypes';
import { fetchMealList } from '@/utils/fetch';
import { Button, Modal, Paper, Select, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import MealItemCard from './MealItemCard';
import { mealListToMap } from '@/utils/arrays';

import { isEqual } from 'lodash';

interface IPopupWindowProps {
    isOpen: boolean;
    meals?: Meal[];
    onClose: () => void;
    onConfirmEdit: (meal: Meal[]) => void;
}
export default function PopupWindow(props: IPopupWindowProps) {
    const [editedMeals, setEditedMeals] = useState<Meal[]>(
        props.meals ? props.meals : [placeholderMeal]
    );

    useEffect(() => {
        if (props.meals) setEditedMeals(props.meals);
    }, [props.meals]);

    const [defaultMealListMap, setDefaultMealListMap] =
        useState<Map<string, Meal>>();

    useEffect(() => {
        fetchMealList().then((data) =>
            setDefaultMealListMap(mealListToMap(data))
        );
    }, []);

    //TODO: add new button

    return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            title="Meal Details"
            size="md"
        >
            {editedMeals.map((meal, index) => (
                <MealItemCard
                    key={index.toString()}
                    meal={meal}
                    defaultMealListMap={defaultMealListMap}
                    onDelete={() =>
                        setEditedMeals(editedMeals.splice(index, 1))
                    }
                    onChangeMeal={(newMeal) => {
                        if (newMeal) {
                            setEditedMeals(editedMeals.with(index, newMeal));
                        }
                    }}
                />
            ))}

            <Button
                onClick={() => {
                    validateObject(editedMeals) &&
                        props.onConfirmEdit(editedMeals);
                }}
            >
                Edit
            </Button>
            {/* <button onClick={() => props.onDeleteMeal()}>Delete</button> */}
        </Modal>
    );
}

function validateObject(obj: Meal[]): boolean {
    //MAKESURE this works
    console.log(Object.values(obj));
    if (
        Object.values(obj).every(
            (foodItem) => !isEqual(foodItem, placeholderMeal)
        )
    ) {
        return true;
    }
    // if (obj.mealId && obj.mealName && obj.mealType)
    //     return {
    //         mealId: obj.mealId,
    //         mealName: obj.mealName,
    //         mealType: obj.mealType,
    //     };
    return false;
}
