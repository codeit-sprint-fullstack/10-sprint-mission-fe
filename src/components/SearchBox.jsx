export default function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="🔍 상품명을 입력하세요"
      aria-label="상품 검색"
      style={{
        flex: 1,
        height: 40,
        padding: '0 12px',
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
    />
  );
}
