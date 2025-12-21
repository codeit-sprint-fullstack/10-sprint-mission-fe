const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL;

/**
 * 게시글 목록 가져오기
 * @param {{ limit?: number, order?: string }} [params]
 * @returns {Promise<{items: Array}>}
 */
export async function getArticles(params = {}) {
    try {
        const url = new URL(baseURL);

        if (params?.limit != null) {
            url.searchParams.set("limit", String(params.limit));
        }
        if (params?.order) {
            url.searchParams.set("order", params.order);
        }

        const response = await fetch(url.toString(), {
            cache: 'no-store', // 서버 컴포넌트에서 최신 데이터 가져오기
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        return { items: [] };
    }
}

