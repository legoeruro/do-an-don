'use client';
import { Grid, Paper } from '@mantine/core';
import classes from '@/components/calendar/calendarStyles.module.css';
import React, { memo } from 'react';

interface CellsProps {
    children?: React.ReactNode;
    key?: string;
}

function Cell(props: CellsProps) {
    return (
        <Grid.Col span={1} className={classes.gridCell}>
            <Paper shadow="xs" className={classes.paperInCellWithMinSize}>
                {props.children}
            </Paper>
        </Grid.Col>
    );
}

export default memo(Cell);
