'use client';
import { Grid, Paper } from '@mantine/core';
import classes from '@/components/calendar/calendarStyles.module.css';
import React, { memo } from 'react';

interface TextOnlyCellsProps {
    text?: string;
    key?: string;
}

function TextOnlyCell(props: TextOnlyCellsProps) {
    return (
        <Grid.Col span={1} className={classes.gridCell}>
            <Paper shadow="xs" className={classes.paperInCell}>
                {props.text}
            </Paper>
        </Grid.Col>
    );
}

export default memo(TextOnlyCell);
