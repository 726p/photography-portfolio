const fs = require("fs");
const path = "E:\\上班\\作品内容\\photography-portfolio\\src\\components\\Hero.jsx";
let c = fs.readFileSync(path, "utf-8");
c = c.replace('import React from "react";', 'import React from "react";\nimport ShinyText from "./ShinyText";');
c = c.replace('<h1 className="hero-title">彭基良</h1>', '<h1 className="hero-title"><ShinyText speed={3} shimmerWidth={80}><span style={{display:"inline-block"}}>彭基良</span></ShinyText></h1>');
fs.writeFileSync(path, c, "utf-8");
console.log("done");
