import { ReactElement } from 'react';

export interface IKpiCardProps {
    title: string;
    icon: ReactElement;
    value: number;
    unit: string;
    segments: {
        label: string;
        value: number;
        color: string;
    }[];
}
