// src/hooks/useSortedItems.js
import { useMemo } from "react";

export default function useSortedItems(items, orderKey) {
    const sortedItems = useMemo(() => {
        if (!items) return [];

        const copy = [...items];

        copy.sort((a, b) => {
            const valueA = a[orderKey] ?? 0;
            const valueB = b[orderKey] ?? 0;
            return valueB - valueA;
        });

        return copy;
    }, [items, orderKey]);

    return sortedItems;
}
