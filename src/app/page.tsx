'use client';
import Link from 'next/link';
import SchedulerStoreProvider from '@/stores/schedulerStore';

export default function Home() {
    return (
        <div>
            <p>hello</p>
            <Link href="/schedules">Create a new schedule</Link>
        </div>
    );
}
