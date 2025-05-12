// src/interfaces/Vehicle/ITechnicalStatus.ts

export interface ITechnicalItem {
    done_at: number;
    next_due: number;
}

export interface ITechnicalStatus {
    vidange: ITechnicalItem;
    batterie: ITechnicalItem;
    bougies: ITechnicalItem;
    gaz_clim: ITechnicalItem;
    chaine: ITechnicalItem;
    pneus: ITechnicalItem;
    filtres: ITechnicalItem;
    plaquettes_frein: ITechnicalItem;
}
