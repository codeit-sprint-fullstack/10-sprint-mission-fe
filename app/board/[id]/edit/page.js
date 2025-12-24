"use client";

import Container from "@/components/Container";
import Input from "@/components/Input";
import styles from "@/styles/BoardNew.module.css";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

async function getArticleById(id) {
    const res = await fetch(`/api/articles/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
}

export default function BoardEditPage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params?.id;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!articleId) return;

        async function loadArticle() {
            const article = await getArticleById(articleId);
            if (article) {
                setTitle(article.title || "");
                setContent(article.content || "");
            } else {
                setError("게시글을 찾을 수 없습니다.");
            }
            setIsLoading(false);
        }
        loadArticle();
    }, [articleId]);

    const isSubmitEnabled = useMemo(() => {
        return title.trim().length > 0 && content.trim().length > 0;
    }, [title, content]);

    const canSubmit = isSubmitEnabled && !isSubmitting && !isLoading;

    async function handleSubmit() {
        if (!canSubmit || !articleId) return;

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch(`/api/articles/${articleId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.error || "게시글 수정에 실패했습니다.");
            }

            router.push(`/board/${articleId}`);
        } catch (e) {
            setError(e?.message || "게시글 수정에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <Container>
                <section className={styles.wrap}>
                    <div>로딩 중...</div>
                </section>
            </Container>
        );
    }

    return (
        <Container>
            <section className={styles.wrap}>
                <div className={styles.headerRow}>
                    <h3 className={styles.title}>게시글 수정하기</h3>
                    <button
                        type="button"
                        className={
                            canSubmit
                                ? `${styles.submitButton} ${styles.submitButtonActive}`
                                : styles.submitButton
                        }
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                    >
                        수정완료
                    </button>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <Input
                    id="title"
                    label="제목"
                    required
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChange={setTitle}
                />

                <Input
                    id="content"
                    label="내용"
                    required
                    placeholder="내용을 입력해주세요."
                    height={282}
                    multiline
                    value={content}
                    onChange={setContent}
                />
            </section>
        </Container>
    );
}

