import React from 'react';
import { VacuumIcons } from '../components/icons/VacuumIcons';

export const UNITS: Record<string, {
    options: string[];
    factors: Record<string, number>;
}> = {
    mass: { options: ['kg', 'g', 'lbs'], factors: { 'kg': 1, 'g': 0.001, 'lbs': 0.453592 } },
    accel: { options: ['m/s²', 'g', 'ft/s²'], factors: { 'm/s²': 1, 'g': 9.81, 'ft/s²': 0.3048 } },
    pressure: { options: ['bar', 'mbar', 'Pa', 'inHg', 'inH₂O'], factors: { 'bar': 100000, 'mbar': 100, 'Pa': 1, 'inHg': 3386.39, 'inH₂O': 249.08 } },
    area: { options: ['mm²', 'cm²', 'm²', 'in²'], factors: { 'mm²': 1e-6, 'cm²': 1e-4, 'm²': 1, 'in²': 0.00064516 } },
    length: { options: ['mm', 'cm', 'm', 'in', 'ft'], factors: { 'mm': 0.001, 'cm': 0.01, 'm': 1, 'in': 0.0254, 'ft': 0.3048 } },
    volume: { options: ['mm³', 'cm³', 'm³', 'l', 'gal'], factors: { 'mm³': 1e-9, 'cm³': 1e-6, 'm³': 1, 'l': 0.001, 'gal': 0.00378541 } },
    flow: { options: ['l/min', 'm³/h', 'ft³/min'], factors: { 'l/min': 1.6667e-5, 'm³/h': 0.000277778, 'ft³/min': 0.000471947 } },
    velocity: { options: ['m/s', 'km/h', 'ft/s', 'mph'], factors: { 'm/s': 1, 'km/h': 0.277778, 'ft/s': 0.3048, 'mph': 0.44704 } },
    percentage: { options: ['%'], factors: { '%': 1 } },
    none: { options: [], factors: {} }
};

export const MENU_ITEMS = [
    {
        id: 'num_cups',
        title: 'Number of Suction Cups',
        titleId: 'Jumlah Suction Cup',
        icon: <VacuumIcons.NumCups className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Calculate required cup units based on load',
        descId: 'Hitung jumlah unit suction cup berdasarkan beban',
    },
    {
        id: 'cup_diameter',
        title: 'Cup Diameter',
        titleId: 'Diameter Suction Cup',
        icon: <VacuumIcons.CupDiameter className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Determine the ideal cup dimension',
        descId: 'Tentukan dimensi suction cup yang ideal',
    },
    {
        id: 'suction_force',
        title: 'Suction Force',
        titleId: 'Gaya Hisap (Suction Force)',
        icon: <VacuumIcons.SuctionForce className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Pulling force per cup unit',
        descId: 'Gaya tarik per unit suction cup',
    },
    {
        id: 'holding_force',
        title: 'Holding Force',
        titleId: 'Gaya Tahan (Holding Force)',
        icon: <VacuumIcons.HoldingForce className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Total holding force of the safety system',
        descId: 'Total gaya tahan sistem keselamatan',
    },
    {
        id: 'hose_dist',
        title: 'Hose Distribution',
        titleId: 'Distribusi Selang (Hose)',
        icon: <VacuumIcons.HoseDist className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Optimize hose flow distribution',
        descId: 'Optimalkan distribusi aliran selang vakum',
    },
    {
        id: 'evac_time',
        title: 'Evacuation Time',
        titleId: 'Waktu Evakuasi Vakum',
        icon: <VacuumIcons.EvacTime className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Time to reach the target vacuum',
        descId: 'Waktu untuk mencapai target level vakum',
    },
    {
        id: 'suction_cap',
        title: 'Suction Capacity',
        titleId: 'Kapasitas Hisap Pompa',
        icon: <VacuumIcons.SuctionCap className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Required pump capacity',
        descId: 'Kapasitas pompa vakum yang dibutuhkan',
    },
    {
        id: 'hose_dia_vac',
        title: 'Hose Diameter',
        titleId: 'Diameter Selang Vakum',
        icon: <VacuumIcons.HoseDia className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Hose size for efficient flow',
        descId: 'Ukuran selang untuk aliran vakum optimal',
    },
    {
        id: 'ambient_pressure',
        title: 'Ambient Pressure',
        titleId: 'Tekanan Udara Ambien',
        icon: <VacuumIcons.AmbientPressure className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Air pressure based on elevation',
        descId: 'Tekanan udara berdasarkan ketinggian lokasi',
    },
    {
        id: 'air_flow',
        title: 'Air Flow Rate',
        titleId: 'Laju Aliran Udara',
        icon: <VacuumIcons.AirFlow className="w-10 h-10 md:w-16 md:h-16" />,
        desc: 'Flow rate through restrictions',
        descId: 'Laju aliran udara melalui pembatas aliran',
    },
];
