export interface Subchapter {
    id: number;
    title: string;
    isLocked: boolean;
}

export const subchapters: Subchapter[] = [
    { id: 1, title: 'Technische Zeichnungen', isLocked: false },
    { id: 2, title: 'Bauzeichnungen lesen', isLocked: true },
    { id: 3, title: 'Symbole und Sinnbilder', isLocked: true },
    { id: 4, title: 'Werkstoffe und Baustoffe in unserem Beruf', isLocked: true },
    { id: 5, title: 'Bearbeiten von Metallen mit Handwerkzeugen', isLocked: true },
    { id: 6, title: 'Prüfen', isLocked: true },
    { id: 7, title: 'Kundenauftrag und Arbeitsplanung', isLocked: true },
/*     { id: 8, title: 'Prüfen', isLocked: true },
    { id: 9, title: 'Kundenauftrag und Arbeitsplanung', isLocked: true }, */
];