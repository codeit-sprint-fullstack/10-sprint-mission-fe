// 주어진 USER_DATA + 간단 헬퍼
// /js/db.js
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

window.DB = {
  list: USER_DATA,
  findByEmail(email) {
    const key = (email || "").trim().toLowerCase();
    return this.list.find((u) => (u.email || "").toLowerCase() === key) || null;
  },
  verify(email, password) {
    const u = this.findByEmail(email);
    return !!(u && u.password === password);
  },
  addUser({ email, password, nickname }) {
    if (this.findByEmail(email)) throw new Error("사용 중인 이메일입니다");
    this.list.push({ email, password, nickname });
  },
};
