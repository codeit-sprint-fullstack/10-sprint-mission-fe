import "./ItemSection.css";

import content1 from "../../../assets/img/content1.svg";
import content2 from "../../../assets/img/content2.svg";
import content3 from "../../../assets/img/content3.svg";

export function ItemSection({
    tag,
    titleLines,
    descLines,
    image,
    alt,
    align = "right",
}) {
    const wrapperClass = align === "left" ? "left-images" : "images";

    return (
        <section>
            <div className="item-content">
                <div className={wrapperClass}>
                    <img src={image} alt={alt} />
                    <div className="info">
                        <span className="tag">{tag}</span>

                        {titleLines.map((line, idx) => (
                            <h2 key={idx} className="title">
                                {line}
                            </h2>
                        ))}

                        {descLines.map((line, idx) => (
                            <p key={idx} className="desc">
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ItemSections() {
    const sections = [
        {
            id: 1,
            tag: "Hot item",
            titleLines: ["인기 상품을", "확인해 보세요"],
            descLines: [
                "가장 HOT한 중고거래 물품을",
                "판다 마켓에서 확인해 보세요.",
            ],
            image: content1,
            alt: "컨텐츠1",
            align: "right",
        },
        {
            id: 2,
            tag: "Search",
            titleLines: ["구매를 원하는", "상품을 검색하세요"],
            descLines: ["구매하고 싶은 물품은 검색해서", "쉽게 찾아보세요"],
            image: content2,
            alt: "컨텐츠2",
            align: "left",
        },
        {
            id: 3,
            tag: "Register",
            titleLines: ["판매를 원하는", "상품을 등록하세요"],
            descLines: [
                "어떤 물건이든 판매하고 싶은 상품을",
                "쉽게 등록하세요",
            ],
            image: content3,
            alt: "컨텐츠3",
            align: "right",
        },
    ];

    return (
        <>
            {sections.map((sec) => (
                <ItemSection key={sec.id} {...sec} />
            ))}
        </>
    );
}

export default ItemSections;
