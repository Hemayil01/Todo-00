const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const usersM = require("../models/users.m");

async function login(req, res) {
    try {
        const { login, password } = req.body

        const exuser = await usersM.findOne({ login })
        if (!exuser) {
            return res.status(400).json({ "message": "İstifadəçi tapılmadı" })
        }

        const hashpass = await bcrypt.compare(password, exuser.password)
        if (!hashpass) {
            return res.status(300).json({ "message": "Şifrə səhvdir" })
        }

       
        const token = jwt.sign(
        { login: exuser.login, id: exuser._id, role: exuser.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "999999h" }
        );

        console.log("LOGIN OLUNDU - Token üçün yaradılan rol:", exuser.role);

        res.status(201).json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

async function register(req, res) {
    try {
        const { name, login, password, userimg, role } = req.body

        const exuser = await usersM.findOne({ login })
        if (exuser) {
            return res.status(400).json({ "message": "Bu istifadəçi artıq mövcuddur!" })
        }

        const hashpass = await bcrypt.hash(password, 12)
        
        // Əgər qeydiyyatda role göndərilibsə onu götür, yoxdursa avtomatik "USER" et
        const user = await usersM.create({ 
            name, 
            login, 
            password: hashpass, 
            userimg,
            role: role || "USER" 
        })

        res.status(201).json({ "message": "Uğurla qeydiyyatdan keçdiniz", user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function me(req, res) {
    res.json({ "message": req.user })
}

module.exports = { register, login, me }