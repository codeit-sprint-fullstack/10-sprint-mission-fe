"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import styles from "@/styles/BoardDetail.module.css";
import buttonallow from "@/public/images/buttonallow.svg";

export default function BackToListButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/board");
    };

    return (
        <Button
            className={styles.backToListButton}
            onClick={handleClick}
        >
            목록으로 돌아가기
            <Image
                src={buttonallow}
                alt="arrow"
                width={24}
                height={24}
            />
        </Button>
    );
}

