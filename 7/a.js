require("dotenv").config();
const jwt = require("jsonwebtoken");

async function salam() {
    try {
        // Köhnə tokenin əvəzinə təzə tokeni bura qoyursan:
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImhlbWF5aWxsbEBnbWFpbC5jb20iLCJpZCI6IjZhYmUyYzBmMjdhNmEyMTQ5MWZlZWU4ZSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc5MDg3ODY3MSwiZXhwIjo1MzkwODc1MDcxfQ.0UU_gOTwYixQxMZR7TkxGPFzdpQTukEySkFiyLRA5VU";

        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded data:", data);

        return data;
    } catch (err) {
        console.error("JWT verification failed:", err.message);
    }
}

salam();