const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Announcement = require('../models/Announcement');
const bidayaModel = require('../models/bidayaModel');
const uoolaModel = require('../models/uoolaModel');
const thaniyaModel = require('../models/thaniya');
const thanawiyyaModel = require('../models/thanawiyyaModel');
const aliyaModel = require('../models/aliyaModel');
const kulliyaModel = require('../models/kulliyaModel');
const Score = require('../models/resultModel');
require('dotenv').config();

const app = express();

// Middleware configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECT_URI,)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route configurations

app.get('/', (req, res) => res.render('loading'));

// Homepage route
app.get('/home', (req, res) => res.render('home'));

// About page route
app.get('/about', (req, res) => res.render('about'));

// Gallery route
app.get('/gallery', async (req, res) => res.render('gallery'));

// Announcement routes
app.get('/adminannounce', (req, res) => res.render('adminannounce'));
app.post('/adminannounce', async (req, res) => {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    
    try {
        await newAnnouncement.save();
        res.redirect('/announcements');
    } catch (error) {
        console.error('Error saving announcement:', error);
        res.status(500).send('Error saving announcement.');
    }
});
app.get('/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.render('announcement', { announcements });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).send('Error fetching announcements.');
    }
});

// Results routes
app.get('/adminres', (req, res) => res.render('adminres'));
app.post('/result', async (req, res) => {
    const {
        teamA, teamB, teamC, teamD,
        bidayatopper, bidayatopperscore,
        uoolatopper, uoolatopperscore,
        thaniyatopper, thaniyatopperscore,
        thabawiyayatopper, thanawiyatopperscore,
        aliyyatopper, aliyatopperscore,
        kulliyatopper, kulliyatopperscore
    } = req.body;

    const newScore = new Score({
        teamA, teamB, teamC, teamD,
        bidayatopper, bidayatopperscore,
        uoolatopper, uoolatopperscore,
        thaniyatopper, thaniyatopperscore,
        thabawiyayatopper, thanawiyatopperscore,
        aliyyatopper, aliyatopperscore,
        kulliyatopper, kulliyatopperscore
    });

    await newScore.save();
    res.redirect('/result');
});

app.get('/result', async (req, res) => {
    const scores = await Score.find();
    const lastScore = scores[scores.length - 1];
    res.render('result', { score: lastScore });
});

// Category-based result routes
// Bidaya category
app.get('/adminBd', (req, res) => res.render('adminBd'));
app.post('/bidaya', async (req, res) => {
    const { bidayaonename, bidayatwoname, bidayathreename, bidayaonegrade, bidayatwograde, bidayathreegrade, bidayaoneteam, bidayatwoteam, bidayathreeteam, programmebidaya } = req.body;

    await bidayaModel.create({ programmebidaya, bidayaonename, bidayatwoname, bidayathreename, bidayaonegrade, bidayatwograde, bidayathreegrade, bidayaoneteam, bidayatwoteam, bidayathreeteam });
    res.redirect('/adminBd');
});
app.get('/result/bidaya', async (req, res) => {
    const bidaya = await bidayaModel.find();
    res.render('bidaya', { bidaya });
});

// Uoola category
app.get('/adminul', (req, res) => res.render('adminUl'));
app.post('/uoola', async (req, res) => {
    const { uoolaonename, uoolatwoname, uoolathreename, uoolaonegrade, uoolatwograde, uoolathreegrade, uoolaoneteam, uoolatwoteam, uoolathreeteam, programmeuoola } = req.body;

    await uoolaModel.create({ programmeuoola, uoolaonename, uoolatwoname, uoolathreename, uoolaonegrade, uoolatwograde, uoolathreegrade, uoolaoneteam, uoolatwoteam, uoolathreeteam });
    res.redirect('/adminul');
});
app.get('/result/uoola', async (req, res) => {
    const uoola = await uoolaModel.find();
    res.render('uoola', { uoola });
});

// Thaniya category
app.get('/admintn', (req, res) => res.render('admintn'));
app.post('/thaniya', async (req, res) => {
    const { thaniyaonename, thaniyatwoname, thaniyathreename, thaniyaonegrade, thaniyatwograde, thaniyathreegrade, thaniyaoneteam, thaniyatwoteam, thaniyathreeteam, programmethaniya } = req.body;

    await thaniyaModel.create({ programmethaniya, thaniyaonename, thaniyatwoname, thaniyathreename, thaniyaonegrade, thaniyatwograde, thaniyathreegrade, thaniyaoneteam, thaniyatwoteam, thaniyathreeteam });
    res.redirect('/admintn');
});
app.get('/result/thaniya', async (req, res) => {
    const thaniya = await thaniyaModel.find();
    res.render('thaniya', { thaniya });
});

// Thanawiyya category
app.get('/admintan', (req, res) => res.render('admintan'));
app.post('/thanawiyya', async (req, res) => {
    const { thanawiyyaonename, thanawiyyatwoname, thanawiyyathreename, thanawiyyaonegrade, thanawiyyatwograde, thanawiyyathreegrade, thanawiyyaoneteam, thanawiyyatwoteam, thanawiyyathreeteam, programmethanawiyya } = req.body;

    await thanawiyyaModel.create({ programmethanawiyya, thanawiyyaonename, thanawiyyatwoname, thanawiyyathreename, thanawiyyaonegrade, thanawiyyatwograde, thanawiyyathreegrade, thanawiyyaoneteam, thanawiyyatwoteam, thanawiyyathreeteam });
    res.redirect('/admintan');
});
app.get('/result/thanawiyya', async (req, res) => {
    const thanawiyya = await thanawiyyaModel.find();
    res.render('thanawiyya', { thanawiyya });
});

// Aliya category
app.get('/adminal', (req, res) => res.render('adminal'));
app.post('/aliya', async (req, res) => {
    const { aliyaonename, aliyatwoname, aliyathreename, aliyaonegrade, aliyatwograde, aliyathreegrade, aliyaoneteam, aliyatwoteam, aliyathreeteam, programmealiya } = req.body;

    await aliyaModel.create({ programmealiya, aliyaonename, aliyatwoname, aliyathreename, aliyaonegrade, aliyatwograde, aliyathreegrade, aliyaoneteam, aliyatwoteam, aliyathreeteam });
    res.redirect('/adminal');
});
app.get('/result/aliya', async (req, res) => {
    const aliya = await aliyaModel.find();
    res.render('aliya', { aliya });
});

// Kulliyya category
app.get('/adminkl', (req, res) => res.render('adminkl'));
app.post('/kulliya', async (req, res) => {
    const { kulliyaonename, kulliyatwoname, kulliyathreename, kulliyaonegrade, kulliyatwograde, kulliyathreegrade, kulliyaoneteam, kulliyatwoteam, kulliyathreeteam, programmekulliya } = req.body;

    await kulliyaModel.create({ programmekulliya, kulliyaonename, kulliyatwoname, kulliyathreename, kulliyaonegrade, kulliyatwograde, kulliyathreegrade });
    res.redirect('/adminkl');
});
app.get('/result/kulliya', async (req, res) => {
    const kulliya = await kulliyaModel.find();
    res.render('kulliya', { kulliya });
});

// Export the app for use in the main server file
module.exports = app;
