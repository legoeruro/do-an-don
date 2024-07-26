import { Meal, mealTypeOptions } from '@/types/FoodSchedulingTypes';
import { fetchMealList } from '@/utils/fetch';
import { Modal, Select, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

interface IPopupWindowProps {
    isOpen: boolean;
    meal?: Meal;
    onClose: () => void;
    onConfirmEdit: (meal: Meal | undefined) => void;
}
export default async function PopupWindow(props: IPopupWindowProps) {
    const [editedMeal, setEditedMeal] = useState<Partial<Meal>>(
        props.meal ? props.meal : defaultMeal
    );

    const [mealList, setMealList] = useState<Meal[]>([]);

    useEffect(() => {
        fetchMealList().then((data) => setMealList(data));
    }, []);

    return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            title="Meal Details"
            size="md"
        >
            <Select
                label="Meal Type"
                placeholder="Select a meal type"
                data={mealTypeOptions}
                value={editedMeal.mealType}
                onChange={(value) =>
                    setEditedMeal({
                        ...editedMeal,
                        mealType: value ?? undefined,
                    })
                }
                clearable
                searchable
            />
            <Select
                label="Meal Name"
                placeholder="Select or search a meal"
                data={mealList.map((meal) => meal.mealName)}
                value={editedMeal.mealName}
                limit={5}
                onChange={(value) =>
                    setEditedMeal({
                        ...editedMeal,
                        mealName: value ?? undefined,
                    })
                }
                clearable
                searchable
            />

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
    if (Object.values(obj).every((item) => !!!item)) {
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
const defaultMeal: Meal = {
    mealId: '0',
    mealName: '',
    mealType: mealTypeOptions[0],
};
