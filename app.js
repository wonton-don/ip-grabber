//require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const axios = require('axios');
const url = require('url');
mongoose.connect('mongodb+srv://dbUser:dtmDhC8wvGys2XIm@cluster0.xtka1tz.mongodb.net/?retryWrites=true&w=majority');
const IPGraber = mongoose.model('IPGraber', { url: String, redirect: String, ips: [] });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.static('public'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('the server is up')
})

app.get('/', (req, res) => {
    res.render('createLink');
})

app.post('/createLink', async (req, res) => {
    const redirect = req.body.redirect;
    const id = uuidv4();
    const Link = new IPGraber({ url: `http://${req.headers.host}/1/${id}`, redirect: redirect, ips: [] });
    await Link.save();
    res.send(`http://${req.headers.host}/1/${id} ^^^^^ http://${req.headers.host}/show/${id}`)
})

app.get('/1/:id', (req, res) => {
    res.render('redirecting')
})

app.get('/show/:id', async (req, res) => {
    const { id } = req.params;
    const info = await IPGraber.findOne({ url: `http://${req.headers.host}/1/${id}` });
    console.log(info);
    res.render('info', { info })
})

app.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await IPGraber.updateOne({ url: `http://${req.headers.host}/1/${id}` }, { redirect: req.body.redirect });
    const nw = await IPGraber.findOne({ url: `http://${req.headers.host}/1/${id}` });
    res.send(nw.redirect)
})

app.get('/:id/:ip', async (req, res) => {
    const { id, ip } = req.params;
    const info = await IPGraber.findOne({ url: `http://${req.headers.host}/1/${id}` });
    if (!info.ips.includes(ip)) {
        info.ips.push(ip);
        info.save();
    }
    if (info.redirect.includes('http://') || info.redirect.includes('https://')) {
        res.redirect(info.redirect)
    } else {
        res.redirect(`http://${info.redirect}`)
    }
})