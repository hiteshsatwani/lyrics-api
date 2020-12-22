const express = require('express')
const app = express();
const cors = require('cors')
const lyricsFinder = require('lyrics-finder');
const { response } = require('express');
const ftl = require('findthelyrics')


app.use(cors())

app.get('/', (req, res) => {
    res.send('Refreshed')
})

app.get('/api/lyrics/:artist/:song', (req, res) => {
    (async function (artist, title) {
        let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        if (lyrics == "Not Found!") {
            const ftl = require("findthelyrics");
            ftl.find(artist, title, function (err, resp) {
                if (!err) {
                    res.send(resp)
                    console.log("backup: " + resp)
                } else {
                    res.send(err)
                    console.log("backup: " + err)
                }
            })
        } else {
            console.log(lyrics);
            res.send(lyrics)
        }

    })(req.params.artist, req.params.song);


})
app.listen(process.env.PORT, () => console.log("Listening on " + process.env.PORT))                                                            