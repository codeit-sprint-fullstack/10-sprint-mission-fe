import styles from "@/styles/Card.module.css";
import { getArticles } from "@/api/client";
import Image from "next/image";
import Link from "next/link";
import badge from "@/public/images/badge.svg";
import notebook from "@/public/images/notebook.svg";
import ImageContainer from "./ImageContainer";

export default async function Card({ items: initialItems } = {}) {
    const items =
        initialItems ??
        (await getArticles({ limit: 3, order: "recent" })).items;

    if (!items || items.length === 0) {
        return (
            <div className={styles.card}>
                <p>게시글이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`/board/${item.id}`}
                    className={styles.cardLink}
                >
                    <div className={styles.cardItem}>
                        <div className={styles.badge}>
                            <Image
                                src={badge}
                                alt={item.title}
                                width={16}
                                height={16}
                            />
                            <span>Best</span>
                        </div>
                        <div className={styles.cardHeader}>
                            <div>
                                <h3 className={styles.cardTitle}>
                                    {item.title}
                                </h3>
                            </div>
                            <ImageContainer>
                                <Image
                                    src={notebook}
                                    alt={item.title}
                                    width={48}
                                    height={44}
                                />
                            </ImageContainer>
                        </div>
                        <div className={styles.cardFooter}>
                            <div className={styles.cardFooterLeft}>
                                <span className={styles.cardUser}>
                                    {item.user}
                                </span>
                                <span className={styles.likeGroup}>
                                    <span
                                        className={styles.heart}
                                        aria-hidden="true"
                                    >
                                        ♡
                                    </span>
                                    <span className={styles.likeCount}>
                                        {item.likeCount}
                                    </span>
                                </span>
                            </div>
                            <div className={styles.cardFooterItem}>
                                {new Date(item.createdAt).toLocaleDateString(
                                    "ko-KR"
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
