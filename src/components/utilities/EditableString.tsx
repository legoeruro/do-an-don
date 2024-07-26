import { TableHeaderInfo } from '@/types/CalendarComponentTypes';
import { Paper, Input } from '@mantine/core';

export type EditableStringProps = {
    text: string;
    onEditText: (newText: string) => void;
    disabled?: boolean;
};

export default function EditableString(props: EditableStringProps) {
    return (
        <Input
            value={props.text}
            onChange={(event) => props.onEditText(event.currentTarget.value)}
            variant="unstyled"
            disabled={props.disabled}
        />
    );
}
