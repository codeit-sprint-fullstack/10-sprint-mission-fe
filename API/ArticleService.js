// AOU URL
const API_URL = 'https://panda-market-api-crud.vercel.app/api/v1/articles';

// 상태코드가 2~~가 아니면 에러 발생
function articleResponse(response) {
  if (!response.ok) {
    return response.text()
      .then(errorMessage => {
        console.error("Article API Error:", errorMessage);
        throw new Error(`API 요청 실패 (${response.status}): ${errorMessage}`);
      });
  }
  return response.json();
}


export function getArticleList(params = {}) {
  const url = new URL(API_URL);
  
  // 쿼리 파라미터 추가
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  return fetch(url.toString())
    .then(articleResponse)
    .catch(error => {
      console.error("오류 발생:", error.message);
      throw error;
    });
}

// 조회

export function getArticle(id) {
  return fetch(`${API_URL}/${id}`)
    .then(articleResponse)
    .catch(error => {
      console.error(`${id} 오류 발생:`, error.message);
      throw error;
    });
}

// 생성
export function createArticle(articleData) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then(articleResponse)
    .catch(error => {
      console.error("생성 오류:", error.message);
      throw error;
    });
}

// 수정
export function patchArticle(id, articleData) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then(articleResponse)
    .catch(error => {
      console.error(`${id} 수정 오류:`, error.message);
      throw error;
    });
}

// 게시글 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(articleResponse)
    .catch(error => {
      console.error(`삭제 오류:`, error.message);
      throw error;
    });
}
