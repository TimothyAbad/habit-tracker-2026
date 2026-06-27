import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { PRIMARY_COLORS, type HeatmapPalette, type PrimaryColorId } from '@/constants/theme';
import { getSetting, setSetting } from '@/db/queries';

type PrimaryColorContextValue = {
  colorId: PrimaryColorId;
  primaryColor: string;
  heatmapPalette: HeatmapPalette;
  setPrimaryColorId: (id: PrimaryColorId) => Promise<void>;
};

const PrimaryColorContext = createContext<PrimaryColorContextValue | null>(null);

const DEFAULT = PRIMARY_COLORS[0];

export function PrimaryColorProvider({ children }: { children: React.ReactNode }) {
  const db = useSQLiteContext();
  const [colorId, setColorId] = useState<PrimaryColorId>(DEFAULT.id);

  useEffect(() => {
    getSetting(db, 'primaryColor').then((saved) => {
      if (saved && PRIMARY_COLORS.some((c) => c.id === saved)) {
        setColorId(saved as PrimaryColorId);
      }
    });
  }, [db]);

  const setPrimaryColorId = useCallback(
    async (id: PrimaryColorId) => {
      await setSetting(db, 'primaryColor', id);
      setColorId(id);
    },
    [db]
  );

  const palette = PRIMARY_COLORS.find((c) => c.id === colorId) ?? DEFAULT;

  return (
    <PrimaryColorContext.Provider
      value={{
        colorId,
        primaryColor: palette.color,
        heatmapPalette: palette.heatmap as HeatmapPalette,
        setPrimaryColorId,
      }}>
      {children}
    </PrimaryColorContext.Provider>
  );
}

export function usePrimaryColor(): PrimaryColorContextValue {
  const ctx = useContext(PrimaryColorContext);
  if (!ctx) throw new Error('usePrimaryColor must be used inside PrimaryColorProvider');
  return ctx;
}
