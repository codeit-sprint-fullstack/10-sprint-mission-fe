import Card from "@/components/Card";
import BoardPostsSection from "@/components/BoardPostsSection";
import Container from "@/components/Container";
import { getArticles } from "@/api/client";
import styles from "@/styles/Board.module.css";

export default async function BoardPage() {
    const [{ items: bestItems }, { items }] = await Promise.all([
        getArticles({ limit: 3, order: "recent" }),
        getArticles({ order: "recent" }),
    ]);

    return (
        <Container>
            <h2 className={styles.bestTitle}>베스트 게시글</h2>
            <Card items={bestItems} />
            <BoardPostsSection items={items} />
        </Container>
    );
}