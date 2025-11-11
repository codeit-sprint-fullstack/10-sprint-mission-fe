import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

function SortDropdown({ value = "recent", onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // (useRef는 null로 초기화하는 거 익히기!)
  const current =
    OPTIONS.find((option) => option.value === value)?.label ?? "최신순";

  useEffect(() => {
    const outsideClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  return (
    <div className="sort" ref={dropdownRef}>
      <button
        type="button"
        className="sort-button"
        onClick={() => setOpen(!open)}
      >
        {current}
        <span className="sort-triangle"></span>
      </button>

      {open && (
        <div className="sort-menu" role="listbox">
          <button
            type="button"
            role="option"
            className="sort-item sort-item-first"
            onClick={() => {
              onChange?.("recent");
              setOpen(false);
            }}
          >
            최신순
          </button>
          <button
            type="button"
            role="option"
            className="sort-item sort-item-second"
            onClick={() => {
              onChange?.("favorite");
              setOpen(false);
            }}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
