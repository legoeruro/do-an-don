'use client';
import SchedulerStoreProvider, {
    createSchedulerStore,
    SchedulerStoreContext,
} from '@/stores/schedulerStore';
import Link from 'next/link';
import { useRef } from 'react';

export default function Schedules() {
    const store = useRef(createSchedulerStore()).current;
    return (
        <div>
            <p>hello</p>
            <Link href="/schedules/1/edit">Create a new schedule</Link>
        </div>
    );
}
