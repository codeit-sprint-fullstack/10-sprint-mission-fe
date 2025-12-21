"use client";

import Container from "@/components/Container";
import Input from "@/components/Input";
import styles from "@/styles/BoardNew.module.css";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function BoardNewPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isSubmitEnabled = useMemo(() => {
        return title.trim().length > 0 && content.trim().length > 0;
    }, [title, content]);

    const canSubmit = isSubmitEnabled && !isSubmitting;

    async function handleSubmit() {
        if (!canSubmit) return;

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    user: "사용자",
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.error || "게시글 등록에 실패했습니다.");
            }

            const id = data?.id ?? data?.item?.id ?? data?.data?.id;
            if (id != null) {
                router.push(`/board/${id}`);
                return;
            }

            router.push("/board");
        } catch (e) {
            setError(e?.message || "게시글 등록에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container>
            <section className={styles.wrap}>
                <div className={styles.headerRow}>
                    <h3 className={styles.title}>게시글 쓰기</h3>
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
                        등록
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


