const express = require('express');
const app = express();

const userModel = require('./usermodel');

// Home route
app.get('/', (req, res) => {
    res.send('hey');
});

// Create user
app.get('/create', async (req, res) => {
    try {
        const createdUser = await userModel.create({
            name: 'Deepak',
            email: 'mentorabhi123@gmail.com',
            username: 'Thakur'
        });

        res.send(createdUser);
    } catch (error) {
        console.log('Create error:', error.message);
        res.status(500).send(error.message);
    }
});

// Update user
app.get('/update', async (req, res) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { username: 'Thakur' },
            { name: 'Deepak Thakur' },
            { new: true }
        );

        if (!updatedUser) {
            return res.send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        console.log('Update error:', error.message);
        res.status(500).send(error.message);
    }
});

app.get('/read' ,async (req, res) =>{
 let users = await userModel.find()
})

app.get('/delete', async (req, res) => {
  let users = await userModel.findOneAndDelete({username: "Thakur"})
  res.send(users)
})
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
