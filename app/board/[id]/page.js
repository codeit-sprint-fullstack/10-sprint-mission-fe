import Container from "@/components/Container";
import styles from "@/styles/BoardDetail.module.css";
import Image from "next/image";
import profiles from "@/public/images/profiles.svg";
import CommentForm from "@/components/CommentForm";

async function getArticleById(id) {
    const backendBase =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/articles";
    const url = new URL(backendBase);
    url.pathname = `${url.pathname.replace(/\/$/, "")}/${id}`;

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
}

export default async function BoardDetailPage({ params }) {
    const { id } = await Promise.resolve(params);
    const article = await getArticleById(id);

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
                    <h2 className={styles.title}>{article.title}</h2>
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
            </article>
        </Container>
    );
}
