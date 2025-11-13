export default function SortBar({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        height: 40,
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: '0 8px',
      }}
      aria-label="정렬 선택"
    >
      <option value="latest">최신순</option>
      <option value="likes">좋아요순</option>
    </select>
  );
}
