import { Grid, Paper } from "@mantine/core";
import classes from '../calendarStyles.module.css';
import EditableString from '../../misc/EditableString';
import React from "react";

interface CellsProps {
    children?: React.ReactNode,
}

export default function Cell(props: CellsProps) {
    return (
        <Grid.Col span={1} >
            <Paper shadow='xs' className={classes.gridCell}>
                {props.children}
            </Paper>
        </Grid.Col>
    )
}
