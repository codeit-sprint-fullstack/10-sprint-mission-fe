import { getArticleList, getArticle, createArticle, deleteArticle, patchArticle } from './utils/ArticleService.js';

const testAllArticleFunctions = async () => {
    console.log("==================== API 테스트 시작 ====================");
    let newArticleId;

    try {
        console.log("1. 기사 생성 테스트...");
        const newArticle = await createArticle(
            'https://test.image.url/new.png',
            '새로 생성된 기사 내용입니다. CRUD 테스트용',
            '새로운 테스트 기사 제목'
        );
        newArticleId = newArticle.id;
        console.log("✅ 생성 성공. ID:", newArticleId, newArticle);

        console.log("2. 기사 조회 테스트...");
        const fetchedArticle = await getArticle(newArticleId);
        console.log("✅ 조회 성공:", fetchedArticle);

        console.log("3. 기사 수정 테스트...");
        const updatedArticle = await patchArticle(
            newArticleId,
            'https://test.image.url/updated.png',
            '내용이 수정되었습니다. CRUD 테스트 완료.',
            '수정된 테스트 기사 제목'
        );
        console.log("✅ 수정 성공:", updatedArticle);

        console.log("4. 목록 조회 테스트 (수정된 기사 검색)...");
        const articleList = await getArticleList(1, 5);
        console.log("✅ 검색 목록 조회 성공 (5개):", articleList);


    } catch (error) {
        console.error("테스트 중 치명적인 오류 발생:", error);
    } finally {
        if (newArticleId) {
            console.log("5. 기사 삭제 테스트...");
            await deleteArticle(newArticleId);
            console.log(`✅ 삭제 성공. ID ${newArticleId}의 기사 삭제 완료.`);
        }
    }
    console.log("==================== API 테스트 완료 ====================");
};

(async () => {
    try {
        const articleList = await getArticleList(1, 10);
        console.log("--- getArticleList 초기 테스트 결과 (1페이지, 10개) ---");
        console.log(articleList);

        await testAllArticleFunctions();

    } catch (error) {
        console.error("기사 목록 가져오기 실패:", error);
    }
})();