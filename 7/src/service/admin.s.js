const usersM = require("../models/users.m");
const Todo = require("../models/todo.m");
const bcrypt = require("bcrypt");



/**
 * Bütün istifadəçiləri və query parametrinə əsasən onların todolarını gətirir.
 * Nümunə sorğular:
 *   GET /api/admin/users
 *   GET /api/admin/users?iscomplite=true
 *   GET /api/admin/users?iscomplite=false&search=kitab
 */

async function getAllUsersWithTodos(req, res) {
    try {
        const { iscomplite, search } = req.query;

        const todoMatch = {};

        if (iscomplite !== undefined) {
            todoMatch.iscomplite = iscomplite === "true";
        }

        if (search) {
            todoMatch.todo = { $regex: search, $options: "i" };
        }


        const users = await usersM.find()
            .select("-password") // Təhlükəsizlik üçün şifrə sahəsini gizlədir
            .populate({
                path: "todos",
                match: todoMatch,
                select: "todo iscomplite createdAt"
            });

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Xəta baş verdi",
            error: error.message
        });
    }
}

async function createUser(req, res) {
    try {
        const { name, login, password, role, userimg } = req.body;

        const existingUser = await usersM.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Bu login ilə istifadəçi artıq mövcuddur!" });
        }

        const hashedPassword = await bcrypt.hash(password || "123456", 12);
        
        const newUser = await usersM.create({
            name,
            login,
            password: hashedPassword,
            role: role || "USER",
            userimg: userimg || "https://www.freeiconspng.com/uploads/person-icon--icon-search-engine-3.png"
        });

    
        const userObj = newUser.toObject();
        delete userObj.password;

        return res.status(201).json({
            success: true,
            message: "İstifadəçi yaradıldı",
            data: userObj
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, login, role, userimg } = req.body;

        const updatedUser = await usersM.findByIdAndUpdate(
            id,
            { name, login, role, userimg },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı!" });
        }

        return res.status(200).json({
            success: true,
            message: "İstifadəçi məlumatları yeniləndi",
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deletedUser = await usersM.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı!" });
        }

        await Todo.deleteMany({ author: id });

        return res.status(200).json({
            success: true,
            message: "İstifadəçi və ona aid todolar silindi"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getAllUsersWithTodos, createUser, updateUser, deleteUser };