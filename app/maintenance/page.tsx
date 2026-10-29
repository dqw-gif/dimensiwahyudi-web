import { Metadata } from 'next';
import MaintenanceClient from './MaintenanceClient';

export const metadata: Metadata = {
    title: 'Under Maintenance | PT Dimensi Quantum Wahyudi',
    description: 'Our system is currently undergoing scheduled service improvements.',
    robots: { index: false, follow: false },
};

export default function MaintenancePage() {
    return <MaintenanceClient />;
}
