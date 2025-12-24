import styles from '@/styles/ImageContainer.module.css'

export default function ImageContainer({children}) {
    return (
    <div className={styles.image}>
        {children}
    </div>
    )
}