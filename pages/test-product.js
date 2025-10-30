import { getProductList, getProduct, createProduct, deleteProduct, patchProduct } from './utils/ProductService.js';

const testAllProductFunctions = async () => {
    console.log("==================== API 테스트 시작 ====================");
    let newProductId;

    const newProductData = {
        images: ['https://product.image.url/1.png', 'https://product.image.url/2.png'],
        tags: ['테스트', '새상품'],
        price: 15000,
        description: '새로 생성된 상품입니다. CRUD 테스트용 설명.',
        name: '새로운 테스트 상품명'
    };

    const updatedProductData = {
        images: ['https://product.image.url/updated.png'],
        tags: ['수정됨', '세일'],
        price: 12000,
        description: '내용이 수정되었습니다. CRUD 테스트 완료.',
        name: '수정된 테스트 상품명'
    };

    try {
        console.log("1. 상품 생성 테스트...");
        const newProduct = await createProduct(
            newProductData.images,
            newProductData.tags,
            newProductData.price,
            newProductData.description,
            newProductData.name
        );
        newProductId = newProduct.id;
        console.log("✅ 생성 성공. ID:", newProductId, newProduct);

        console.log("2. 상품 조회 테스트...");
        const fetchedProduct = await getProduct(newProductId);
        console.log("✅ 조회 성공:", fetchedProduct);

        console.log("3. 상품 수정 테스트...");
        const updatedProduct = await patchProduct(
            newProductId,
            updatedProductData.images,
            updatedProductData.tags,
            updatedProductData.price,
            updatedProductData.description,
            updatedProductData.name
        );
        console.log("✅ 수정 성공:", updatedProduct);

        console.log("4. 목록 조회 테스트 (5개)...");
        const productList = await getProductList(1, 5);
        console.log("✅ 목록 조회 성공 (5개):", productList);


    } catch (error) {
        console.error("테스트 중 치명적인 오류 발생:", error);
    } finally {
        if (newProductId) {
            console.log("5. 상품 삭제 테스트...");
            await deleteProduct(newProductId);
            console.log(`✅ 삭제 성공. ID ${newProductId}의 상품 삭제 완료.`);
        }
    }
    console.log("==================== API 테스트 완료 ====================");
};

(async () => {
    try {
        const productList = await getProductList(1, 10);
        console.log("--- getProductList 초기 테스트 결과 (1페이지, 10개) ---");
        console.log(productList);

        await testAllProductFunctions();

    } catch (error) {
        console.error("상품 목록 가져오기 실패:", error);
    }
})();