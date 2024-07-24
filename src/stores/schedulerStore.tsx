'use client';
import { createStore } from 'zustand';
import React, { createContext, useRef } from 'react';
import {
    createScheduleSlice,
    IScheduleSliceProps,
    IScheduleSlice,
} from './scheduleSlice';

export interface IStore extends IScheduleSlice {}
export interface IStoreProps extends IScheduleSliceProps {}

export interface IStorePartial
    extends ReturnType<typeof createSchedulerStore> {}

export const createSchedulerStore = (initProps?: Partial<IStoreProps>) => {
    return createStore<IStore>((...a) => ({
        ...createScheduleSlice(...a),
        ...initProps,
    }));
};

// Provider wrapper for the store
export const SchedulerStoreContext = createContext<IStorePartial | null>(null);

interface IBearProviderProps
    extends React.PropsWithChildren<Partial<IStoreProps>> {}
function SchedulerStoreProvider({ children, ...props }: IBearProviderProps) {
    const storeRef = useRef<IStorePartial>();
    if (!storeRef.current) {
        console.log('Creating store');
        storeRef.current = createSchedulerStore(props);
    }
    console.log(storeRef.current);
    return (
        <SchedulerStoreContext.Provider value={storeRef.current}>
            {children}
        </SchedulerStoreContext.Provider>
    );
}

export default SchedulerStoreProvider;
