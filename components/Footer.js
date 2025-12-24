import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/images/snslogos/facebook.svg";
import twitter from "@/public/images/snslogos/twitter.svg";
import instagram from "@/public/images/snslogos/instagram.svg";
import youtube from "@/public/images/snslogos/youtube.svg";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerCopyright}>
                    <span>©codeit - 2024</span>
                </div>
                <div className={styles.footerLinks}>
                    <Link href="/privacy-policy">Privacy Policy </Link>
                    <Link href="/faq">FAQ</Link>
                </div>
                <div className={styles.snsLogos}>
                    <Image
                        src={facebook}
                        alt="facebook"
                        width={18}
                        height={18}
                    />
                    <Image
                        src={twitter}
                        alt="facebook"
                        width={18}
                        height={18}
                    />
                    <Image
                        src={instagram}
                        alt="instagram"
                        width={18}
                        height={18}
                    />
                    <Image src={youtube} alt="youtube" width={18} height={18} />
                </div>
            </div>
        </footer>
    );
}
