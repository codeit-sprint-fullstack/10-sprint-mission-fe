"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profiles from "@/public/images/profiles.svg";
import styles from "@/styles/BoardDetail.module.css";
import notcomment from "@/public/images/notcomment.svg";
import kebab from "@/public/images/kebab.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";

function getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
        return "방금 전";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
        return `${diffInDays}일 전`;
    } else {
        return date.toLocaleDateString("ko-KR");
    }
}

function CommentItem({ comment, onEdit, onDelete }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuOpen]);

    const handleEdit = () => {
        if (onEdit) {
            onEdit(comment);
            setMenuOpen(false);
            return;
        }
        setIsEditing(true);
        setMenuOpen(false);
    };

    const handleSaveEdit = async () => {
        if (!editContent.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        try {
            const commentId = comment.id || comment._id;
            const res = await fetch(`/api/article-comments/${commentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: editContent.trim(),
                }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(data?.error || "댓글 수정에 실패했습니다.");
            }

            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error("Failed to update comment:", error);
            alert(error.message || "댓글 수정에 실패했습니다.");
        }
    };

    const handleCancelEdit = () => {
        setEditContent(comment.content);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (onDelete) {
            onDelete(comment);
            return;
        }

        if (!confirm("정말 삭제하시겠습니까?")) {
            setMenuOpen(false);
            return;
        }

        try {
            const commentId = comment.id || comment._id;
            const res = await fetch(`/api/article-comments/${commentId}`, {
                method: "DELETE",
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(data?.error || "댓글 삭제에 실패했습니다.");
            }

            router.refresh();
        } catch (error) {
            console.error("Failed to delete comment:", error);
            alert(error.message || "댓글 삭제에 실패했습니다.");
        } finally {
            setMenuOpen(false);
        }
    };

    return (
        <div className={styles.commentItem}>
            <div className={styles.commentContent}>
                {isEditing ? (
                    <Input
                        multiline
                        value={editContent}
                        onChange={setEditContent}
                        placeholder="댓글을 입력해주세요."
                        className={styles.commentEditInput}
                        inputClassName={styles.commentEditInputField}
                    />
                ) : (
                    <div className={styles.commentContentRow}>
                        <p>{comment.content}</p>
                        <div className={styles.commentMenu} ref={menuRef}>
                            <button
                                type="button"
                                className={styles.kebabButton}
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="댓글 메뉴"
                            >
                                <Image src={kebab} alt="menu" width={3} height={13} />
                            </button>
                            {menuOpen && (
                                <div className={styles.commentDropdown}>
                                    <button
                                        type="button"
                                        className={styles.commentDropdownItem}
                                        onClick={handleEdit}
                                    >
                                        수정하기
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.commentDropdownItem}
                                        onClick={handleDelete}
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.commentMeta}>
                <div className={styles.commentMetaRow}>
                    <div className={styles.commentMetaLeft}>
                        <Image
                            className={styles.profileImg}
                            src={profiles}
                            alt="profile"
                            width={32}
                            height={32}
                        />
                        <div className={styles.commentUserInfo}>
                            <span className={styles.metaValue}>
                                {comment.user}
                            </span>
                            <span className={styles.CommentDateValue}>
                                {getRelativeTime(comment.createdAt)}
                            </span>
                        </div>
                    </div>
                    {isEditing && (
                        <div className={styles.commentEditButtons}>
                            <Button onClick={handleCancelEdit} className={styles.cancelButton}>취소</Button>
                            <Button onClick={handleSaveEdit}>수정완료</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CommentList({ comments = [], onEdit, onDelete }) {
    if (comments.length === 0) {
        return (
            <div className={styles.empty}>
                <Image src={notcomment} alt="notcomment" width={140} height={140} />
                <p className={styles.emptyText}>아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!</p>
            </div>
        );
    }

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id || comment._id}
                        comment={comment}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

