import Image from "next/image";
import profiles from "@/public/images/profiles.svg";
import styles from "@/styles/BoardDetail.module.css";

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

export default function CommentList({ comments = [] }) {
    if (comments.length === 0) {
        return (
            <div className={styles.empty}>댓글이 없습니다.</div>
        );
    }

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
                {comments.map((comment) => (
                    <div key={comment.id || comment._id} className={styles.commentItem}>
                        <div className={styles.commentContent}>
                            <p>{comment.content}</p>
                        </div>
                        <div className={styles.commentMeta}>
                            <div className={styles.commentMetaRow}>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

