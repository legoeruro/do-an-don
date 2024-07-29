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

interface IPopupWindowProps {
    isOpen: boolean;
    meals?: Meal[];
    onClose: () => void;
    onConfirmEdit: (meal: Meal[] | undefined) => void;
}
export default function PopupWindow(props: IPopupWindowProps) {
    const [editedMeals, setEditedMeals] = useState<Partial<Meal[]>>(
        props.meals ? props.meals : [placeholderMeal]
    );

    const [mealType, setMealType] = useState<MealTypes | undefined>(undefined);

    useEffect(() => {
        if (props.meals) setEditedMeals(props.meals);
    }, [props.meals]);

    const [mealList, setMealList] = useState<Meal[]>([]);

    useEffect(() => {
        fetchMealList(mealType).then((data) => setMealList(data));
    }, [mealType]);

    return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            title="Meal Details"
            size="md"
        >
            <Paper shadow="xs">
                <Button />
            </Paper>

            <button
                onClick={() => props.onConfirmEdit(validateObject(editedMeal))}
            >
                Edit
            </button>
            {/* <button onClick={() => props.onDeleteMeal()}>Delete</button> */}
        </Modal>
    );
}

function validateObject(obj: Partial<Meal>): Meal | undefined {
    console.log(Object.values(obj));
    if (Object.values(obj).every((item) => item)) {
        return obj as Meal;
    }
    // if (obj.mealId && obj.mealName && obj.mealType)
    //     return {
    //         mealId: obj.mealId,
    //         mealName: obj.mealName,
    //         mealType: obj.mealType,
    //     };
    return undefined;
}
