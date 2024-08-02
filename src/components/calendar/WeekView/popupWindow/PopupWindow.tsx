'use client';
import {
    Dish,
    dishTypesOptions,
    DishTypes,
    placeholderDish,
} from '@/types/FoodSchedulingTypes';
import { fetchDishesList } from '@/utils/fetch';
import { Button, Modal, Paper, Select, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import DishesItemCard from './ItemCard';
import { dishesListToMap } from '@/utils/arrays';

import { isEqual } from 'lodash';

interface IPopupWindowProps {
    isOpen: boolean;
    dishes?: Dish[];
    onClose: () => void;
    onConfirmEdit: (dishes: Dish[]) => void;
}
export default function PopupWindow(props: IPopupWindowProps) {
    const [editedDishes, setEditedDishes] = useState<Dish[]>(
        props.dishes ? props.dishes : [placeholderDish]
    );

    useEffect(() => {
        if (props.dishes) setEditedDishes(props.dishes);
    }, [props.dishes]);

    const [defaultDishesListMap, setDefaultDishesListMap] =
        useState<Map<string, Dish>>();

    useEffect(() => {
        fetchDishesList().then((data) =>
            setDefaultDishesListMap(dishesListToMap(data))
        );
    }, []);

    //TODO: add new dish button

    return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            title="Dishes Details"
            size="md"
        >
            {editedDishes.map((dish, index) => (
                <DishesItemCard
                    key={index.toString()}
                    dish={dish}
                    defaultDishesListMap={defaultDishesListMap}
                    onDelete={() =>
                        setEditedDishes(editedDishes.splice(index, 1))
                    }
                    onChange={(newDish) => {
                        if (newDish) {
                            setEditedDishes(editedDishes.with(index, newDish));
                        }
                    }}
                />
            ))}

            <Button
                onClick={() => {
                    props.onConfirmEdit(editedDishes);
                }}
            >
                Edit
            </Button>
            {/* <button onClick={() => props.onDeleteDishes()}>Delete</button> */}
        </Modal>
    );
}
