"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "@/styles/BoardDetail.module.css";

export default function CommentForm({ articleId }) {
    const router = useRouter();
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canSubmit = useMemo(() => {
        return comment.trim().length > 0 && !isSubmitting;
    }, [comment, isSubmitting]);

    async function handleSubmit() {
        if (!canSubmit) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/articles/${articleId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: comment.trim(),
                    user: "사용자",
                }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(data?.error || "댓글 등록에 실패했습니다.");
            }

            setComment("");
            router.refresh();
        } catch (e) {
            // 필요하면 UI 에러 표시로 확장 가능
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h3 className={styles.commentTitle}>댓글 달기</h3>
            <Input
                placeholder="댓글을 입력해주세요."
                multiline
                height={104}
                value={comment}
                onChange={setComment}
            />
            <div className={styles.buttonRow}>
                <Button disabled={!canSubmit} onClick={handleSubmit}>
                    등록
                </Button>
            </div>
        </div>
    );
}



