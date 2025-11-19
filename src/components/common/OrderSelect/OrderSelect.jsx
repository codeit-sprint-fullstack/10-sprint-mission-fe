import { useEffect, useRef, useState } from "react";
import "./OrderSelect.css";

const OPTIONS = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
];

export default function OrderSelect({ value = "recent", onChange }) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

    useEffect(() => {
        const onDoc = (e) => {
            if (!wrapRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const onScroll = () => setOpen(false);

        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        window.addEventListener("scroll", onScroll, true);

        return () => {
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
            window.removeEventListener("scroll", onScroll, true);
        };
    }, []);

    const handleSelect = (v) => {
        onChange?.(v);
        setOpen(false);
    };

    return (
        <div className="order-select-wrap" ref={wrapRef}>
            <button
                type="button"
                className={`order-Select-btn ${open ? "open" : ""}`}
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {current.label}
                <span className="order-Select-caret" aria-hidden="true" />
            </button>

            {open && (
                <ul className="order-Select-menu" role="listbox">
                    {OPTIONS.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={value === opt.value}
                            className={
                                "order-Select-item" +
                                (value === opt.value ? " selected" : "")
                            }
                            onClick={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
