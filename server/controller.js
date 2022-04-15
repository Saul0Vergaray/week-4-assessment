let memes = require('./db.json')
let globalId = 11

module.exports = {
    getMemes: (req, res) => res.status(200).send(memes),
    deleteMeme: (req, res) => {
        let index = memes.findIndex(elem => elem.id === +req.params.id)
        memes.splice(index, 1)
        res.status(200).send(memes)
    },
    createMeme: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newMemes = {
            id: globalId,
            title, 
            rating,
            imageURL
        }
        memes.push(newMemes)
        res.status(200).send(memes)
        globalId++
    },
    updateMeme: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = memes.findIndex(elem => +elem.id === +id)

        if (memes[index].rating === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (memes[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            memes[index].rating++
            res.status(200).send(memes)
        } else if (type === 'minus') {
            memes[index].rating--
            res.status(200).send(memes)
        } else {
            res.sendStatus(400)
        }
    }
}

  app.listen(4000, () => console.log("Server running on 4000"));