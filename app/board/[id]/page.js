import Container from "@/components/Container";
import styles from "@/styles/BoardDetail.module.css";
import Image from "next/image";
import profiles from "@/public/images/profiles.svg";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import BackToListButton from "@/components/BackToListButton";
import ArticleKebabMenu from "@/components/ArticleKebabMenu";

async function getArticleById(id) {
    const backendBase =
        process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL(backendBase);
    url.pathname = `${url.pathname.replace(/\/$/, "")}/${id}`;

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
}

async function getCommentsByArticleId(id) {
    try {
        const backendBase =
            process.env.NEXT_PUBLIC_BASE_URL;
        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}/comments`;

        const res = await fetch(backendUrl.toString(), { cache: "no-store" });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return [];
    }
}

export default async function BoardDetailPage({ params }) {
    const { id } = await Promise.resolve(params);
    const [article, comments] = await Promise.all([
        getArticleById(id),
        getCommentsByArticleId(id),
    ]);

    if (!article) {
        return (
            <Container>
                <div className={styles.empty}>게시글을 찾을 수 없습니다.</div>
            </Container>
        );
    }

    return (
        <Container>
            <article className={styles.wrap}>
                <div className={styles.titleSection}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>{article.title}</h2>
                        <ArticleKebabMenu articleId={id} />
                    </div>
                    <div className={styles.metaRow}>
                        <div className={styles.metaUserRow}>
                            <span className={styles.metaUser}>
                                <Image
                                    className={styles.profileImg}
                                    src={profiles}
                                    alt="profile"
                                    width={40}
                                    height={40}
                                />
                                <span className={styles.metaValue}>
                                    {article.user}
                                </span>
                            </span>
                            <span className={styles.metaDateValue}>
                                {new Date(article.createdAt).toLocaleDateString(
                                    "ko-KR"
                                )}
                            </span>
                        </div>
                        <div className={styles.likeCount}>
                            <span>♡ {article.likeCount}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <p className={styles.content}>{article.content}</p>
                </div>

                <CommentForm articleId={id} />
                <CommentList comments={comments} />
                <div className={styles.returnButton}>
                    <BackToListButton />
                </div>
            </article>
        </Container>
    );
}
