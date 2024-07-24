import { Grid, Paper } from '@mantine/core';
import classes from '../calendarStyles.module.css';
import EditableString from '../../utilities/EditableString';
import React, { memo } from 'react';

interface CellsProps {
    children?: React.ReactNode;
    key?: string;
}

function Cell(props: CellsProps) {
    return (
        <Grid.Col span={1} className={classes.gridCell}>
            <Paper shadow="xs" className={classes.paperInCell}>
                {props.children}
            </Paper>
        </Grid.Col>
    );
}

export default memo(Cell);
