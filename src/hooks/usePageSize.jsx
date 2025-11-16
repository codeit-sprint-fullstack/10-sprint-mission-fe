// usePageSize.js
import { useEffect, useState } from "react";

export default function usePageSize({ mobile, tablet, desktop }) {
    const [size, setSize] = useState(desktop);

    useEffect(() => {
        const decide = () => {
            const w = window.innerWidth;
            if (w < 743) setSize(mobile);
            else if (w < 1199) setSize(tablet);
            else setSize(desktop);
        };
        decide();
        window.addEventListener("resize", decide);
        return () => window.removeEventListener("resize", decide);
    }, [mobile, tablet, desktop]);

    return size;
}
