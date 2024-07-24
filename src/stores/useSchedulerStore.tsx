import { useContext } from 'react';
import { useStore } from 'zustand';
import { IStore, SchedulerStoreContext } from './schedulerStore';

export function useSchedulerStoreContext<T>(selector: (state: IStore) => T): T {
    const store = useContext(SchedulerStoreContext);
    if (!store) throw new Error('Missing BearContext.Provider in the tree');
    return useStore(store, selector);
}
