function EmptyResult({ message = "검색 결과가 없습니다 :(˘•̥ㅁ•̥˘ ):" }) {
  return (
    <div className="empty-result">
      <p>{message}</p>
    </div>
  );
}

export default EmptyResult;
