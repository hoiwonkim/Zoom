import express from "express";
import path from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views")); // 'views' 디렉토리의 정확한 위치를 지정합니다.
app.use("/public", express.static(path.join(__dirname, "/public"))); // 정적 파일 경로를 추가.
app.get("/", (req, res) => res.render("home")); // 'home'은 views 폴더 내에 있는 home.pug를 가리킵니다.

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
