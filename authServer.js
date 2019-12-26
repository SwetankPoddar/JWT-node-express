require('dotenv').config()

const express = require('express');
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []


app.post('/token', (req, res) => {
    const refreshToken = req.body.token

    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_CODE, (err, user) => {
        if (err) return res.sendStatus(403)

        const accessToken = generateAcessToken({name: user.name})

        return res.json({accessToken: accessToken})
    })


})

app.post('/login', (req, res) => {
    //Authenticate user

    // Presuming user is authenticated 
    
    const username = req.body.username
    const user = {name: username};
    const accessToken = generateAcessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_CODE)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    return res.sendStatus(204)
})


function generateAcessToken(user){
    return jwt.sign(user, process.env.CODE, { expiresIn: '40s' });

}


app.listen(4000)