import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle,
} from "./ArticleService.js";
import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct,
} from "./ProductService.js";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Express");
});


getArticleList({ page: 1, pageSize: 10, keyword: "" })
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.error("에러발생");
        console.log(e.message);
    });

getArticle(5124)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log("에러 발생");
        console.log(e.message);
    });

const test = {
    image: "https://asdasd.com/",
    content: "게시글 내용",
    title: "게시글 제목",
};

createArticle(test)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log("에러발생");
        console.log(e.message);
    });

const patchData = {
    image: "https://asdasd.com/",
    content: "수정된 내용",
    title: "수정된 제목",
};

patchArticle(5124, patchData)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e.message);
    });

deleteArticle(5124)
    .then((data) => {
        console.log("데이터가 삭제되었습니다.", data);
    })
    .catch((e) => {
        console.log(e.message);
    });

/* Article 호출 구분 */

/* Products 호출 시작*/

const parametor = {
    page: 1,
    pageSize: 10,
    keyword: "",
};

getProductList({ parametor })
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e.message);
        console.log(e.response);
    });

getProduct(2650)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e.message);
    });

const Proparametor = {
    name: "선풍기",
    description: "샤오미 선풍기가 5천원!",
    price: 3000,
    tags: [],
    images: [],
};

createProduct(Proparametor)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e.message);
    });

const patchParametor = {
    name: "선풍기",
    description: "샤오미 선풍기가 5천원!",
    price: 5000,
    tags: [],
    images: [],
};

patchProduct(2667, patchParametor)
    .then((data) => {
        console.log("데이터가 정상적으로 수정되었습니다", data);
    })
    .catch((e) => {
        console.log(e.message);
    });

deleteProduct(2667)
    .then((data) => {
        console.log("데이터가 정상적으로 삭제되었습니다", data);
    })
    .catch((e) => {
        console.log(e.message);
    });

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});