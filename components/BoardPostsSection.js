"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Board.module.css";
import Search from "@/components/Search";
import SortDropdown from "@/components/SortDropdown";
import useDebounce from "@/hooks/useDebounce";
import notebook from "@/public/images/notebook.svg";
import Image from "next/image";
import ImageContainer from "./ImageContainer";

export default function BoardPostsSection({ items: initialItems = [] }) {
    const [query, setQuery] = useState("");
    const [order, setOrder] = useState("recent"); // 최신순 default
    const [items, setItems] = useState(initialItems);

    const debouncedQuery = useDebounce(query, 300);
    const keyword = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                const url = new URL("/api/articles", window.location.origin);
                url.searchParams.set("order", order);
                if (keyword) {
                    url.searchParams.set("keyword", keyword);
                }
                const res = await fetch(url.toString(), {
                    cache: "no-store",
                    signal: ac.signal,
                });
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                const data = await res.json();
                setItems(data?.items ?? []);
            } catch (e) {
                if (e?.name === "AbortError") return;
                console.error("Failed to fetch articles:", e);
            }
        })();

        return () => ac.abort();
    }, [order, keyword]);

    return (
        <section className={styles.postsSection}>
            <div className={styles.postsHeader}>
                <h2 className={styles.postsTitle}>게시글</h2>
                <Link href="/board/new" className={styles.writeButton}>
                    글쓰기
                </Link>
            </div>

            <div className={styles.postsToolbar}>
                <div className={styles.searchWrap}>
                    <Search
                        value={query}
                        onChange={setQuery}
                        placeholder="검색할 상품을 입력해주세요"
                    />
                </div>
                <SortDropdown value={order} onChange={setOrder} />
            </div>

            <div className={styles.postsList}>
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/board/${item.id}`}
                        className={styles.postLink}
                    >
                        <article className={styles.postItem}>
                            <div className={styles.BoardHeader}>
                                <h3 className={styles.postTitle}>
                                    {item.title}
                                </h3>
                                <ImageContainer>
                                    <Image
                                        src={notebook}
                                        alt={item.title}
                                        width={48}
                                        height={44}
                                    />
                                </ImageContainer>
                            </div>
                            <div className={styles.postMeta}>
                                <span className={styles.postUser}>
                                    {item.user}
                                </span>
                                <span
                                    className={styles.postDivider}
                                    aria-hidden="true"
                                >
                                    ·
                                </span>
                                <span className={styles.postDate}>
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString("ko-KR")}
                                </span>
                                <span className={styles.postMetaSpacer} />
                                <span className={styles.postLikes}>
                                    ♡ {item.likeCount}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
