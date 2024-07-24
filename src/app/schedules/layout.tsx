import SchedulerStoreProvider, {
    SchedulerStoreContext,
} from '@/stores/schedulerStore';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Creating and initializing the store
    //TODO: move this into a subdirectory
    return <SchedulerStoreProvider>{children}</SchedulerStoreProvider>;
}
