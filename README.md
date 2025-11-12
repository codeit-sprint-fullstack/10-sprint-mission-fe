# 🐼 Panda Market – React Sprint Mission

본 문서는 중고마켓 페이지 구현을 위한 요구사항입니다.  
저장소 루트의 `README.md` 로 사용하세요.

---

## ✅ 기본 요구사항

### 공통
- [ ] Github에 스프린트 미션 **PR(Pull Request)** 을 만들어 주세요.
- [ ] **React**를 사용해 진행합니다.

### 중고마켓 페이지
- [ ] **PC / Tablet / Mobile** 디자인에 해당하는 **중고마켓 페이지**를 만들어 주세요.
- [ ] 중고마켓 페이지 **URL path는 별도 라우팅 없이 `/`** (루트 경로)에 보이도록 합니다.
- [ ] 상단 **네비게이션 바(Header)**, **푸터(Footer)** 는 **랜딩 페이지와 동일한 스타일과 규칙**으로 만들어 주세요.
- [ ] 상품 데이터는 [https://panda-market-api.vercel.app/docs/](https://panda-market-api.vercel.app/docs/) 에 명세된 **GET `/products`** 를 활용해 주세요.
- [ ] **상품 목록 페이지네이션** 기능을 구현합니다.
- [ ] **드롭다운**으로 “**최신 순**” 또는 “**좋아요 순**” 정렬 기능을 구현합니다.
- [ ] **상품 목록 검색** 기능을 구현합니다.

- [ ] **베스트 상품 데이터**는 [https://panda-market-api.vercel.app/docs/](https://panda-market-api.vercel.app/docs/) 에 명세된 **GET `/products`** 의 정렬 기준 **`favorite`** 을 사용해 주세요.

---

## 💎 심화 요구사항

### 공통
- [ ] **커스텀 Hook**을 만들어 필요한 곳에 활용해 보세요.

### 중고마켓 페이지 (반응형 & 페이지네이션)
- [ ] 중고마켓 카드 컴포넌트의 반응형 기준은 다음과 같습니다.

#### 🏆 베스트 상품
- Desktop: 4열  
- Tablet: 2열  
- Mobile: 1열  

#### 🛒 전체 상품
- Desktop: 5열  
- Tablet: 3열  
- Mobile: 2열  

- [ ] 반응형에 따른 **페이지네이션 기능**을 구현합니다.  
- [ ] 반응형으로 보여지는 물품 개수에 따라 서버에 전송하는 **`pageSize`** 값을 적절히 설정합니다.
