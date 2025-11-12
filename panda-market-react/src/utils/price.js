export const price = (n) => {
  const number = n ?? 0;

  const formattedNumber = number.toLocaleString("ko-KR");

  return formattedNumber + "원";
}; // toLocaleString('ko-KR')을 사용하면 한국 로케일 기준에 맞춰 3자리마다 쉼표를 자동으로 삽입(알아두자)
