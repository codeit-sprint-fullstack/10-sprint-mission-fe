"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kebab from "@/public/images/kebab.svg";
import styles from "@/styles/BoardDetail.module.css";

export default function ArticleKebabMenu({ articleId, onEdit }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
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
        router.push(`/board/${articleId}/edit`);
        setMenuOpen(false);
    };

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) {
            setMenuOpen(false);
            return;
        }

        try {
            const res = await fetch(`/api/articles/${articleId}`, {
                method: "DELETE",
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(data?.error || "게시글 삭제에 실패했습니다.");
            }

            router.push("/board");
        } catch (error) {
            console.error("Failed to delete article:", error);
            alert(error.message || "게시글 삭제에 실패했습니다.");
        } finally {
            setMenuOpen(false);
        }
    };

    return (
        <div className={styles.commentMenu} ref={menuRef}>
            <button
                type="button"
                className={styles.kebabButton}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="게시글 메뉴"
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
    );
}

