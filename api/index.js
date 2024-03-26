const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

const secret = 'csk123@1dhuegebejdhweudihdiwdiiycch#$%'
const salt = bcrypt.genSaltSync(10);


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://ckotian117:chirag123@mern.g1jjwn9.mongodb.net');


//function for registering user
app.post('/register', async (req, res) => {
    const { userName, userPassword } = req.body;
    try {
        const userDoc = await User.create({
            userName,
            userPassword: bcrypt.hashSync(userPassword, salt),
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

//function for user login
app.post('/login', async (req, res) => {
    const { userName, userPassword } = req.body;
    const userDoc = await User.findOne({ userName });
    const passok = bcrypt.compareSync(userPassword, userDoc.userPassword);
    if (passok) {
        //if logged in
        jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                userName,
            });
        });
    } else {
        res.status(400).json('Wrong CreDentials..!!');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', upload.single('file'), async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});


//for posting 
app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['userName'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
});

app.put('/post', upload.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json("You are not the author");
        }
        await Post.updateOne({ _id: id }, { $set: { title, summary, content, cover: newPath ? newPath : postDoc.cover } });
        // Retrieve the updated document
        const updatedPostDoc = await Post.findById(id);
        res.json(updatedPostDoc);
    });

});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['userName']);
    res.json(postDoc);
})

app.listen(4000);