// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express


const dotenv = require("dotenv");

dotenv.config({ path: '.env' });

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.get('/hello', (req, res) => {
    res.send('hello world')
})


// const User = require('./models/user.model')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')



app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            sheetId: ''
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: err })
    }
})


app.post('/api/fetchSheetId', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email and password
      const user = await User.findOne({ email, password });
  
      if (!user) {
        // If user not found, return an error
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract the sheetId from the user document
      const sheetId = user.sheetId;
  
      // Return the sheetId in the response
      res.json({ sheetId });
    } catch (error) {
      console.error('Error fetching sheetId:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.get('/api/getSheetIdByEmail/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const sheetId = user.sheetId;
      res.json({ sheetId });
    } catch (error) {
      console.error('Error getting sheetId by email:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(user) {
        return res.json({ status: 'ok', user: true})
    } else {
        return res.json({ status: 'error', user: false})
    }
})



app.listen(1337, () => {
    console.log('Server started on 1337')
})

// app.use(express.json())


// app.post('/api/register', async (req, res) => {
// 	console.log(req.body)
// 	try {
// 		const newPassword = await bcrypt.hash(req.body.password, 10)
// 		await User.create({
// 			// name: req.body.name,
// 			email: req.body.email,
// 			password: newPassword,
// 		})
// 		res.json({ status: 'ok' })
// 	} catch (err) {
// 		res.json({ status: 'error', error: 'Duplicate email' })
// 	}
// })

// app.post('/api/login', async (req, res) => {
// 	const user = await User.findOne({
// 		email: req.body.email,
// 	})

// 	if (!user) {
// 		return { status: 'error', error: 'Invalid login' }
// 	}

// 	const isPasswordValid = await bcrypt.compare(
// 		req.body.password,
// 		user.password
// 	)

// 	if (isPasswordValid) {
// 		const token = jwt.sign(
// 			{
// 				name: user.name,
// 				email: user.email,
// 			},
// 			'secret123'
// 		)

// 		return res.json({ status: 'ok', user: token })
// 	} else {
// 		return res.json({ status: 'error', user: false })
// 	}
// })

// app.get('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		const user = await User.findOne({ email: email })

// 		return res.json({ status: 'ok', quote: user.quote })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

// app.post('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		await User.updateOne(
// 			{ email: email },
// 			{ $set: { quote: req.body.quote } }
// 		)

// 		return res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })