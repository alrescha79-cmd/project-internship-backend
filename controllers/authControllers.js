const axios = require('axios');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await axios.post(process.env.URL_LOGIN, {
            email,
            password,
            returnSecureToken: true
        });

        res.status(200).json({
            message: 'Login success',
            data: response.data
        });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        if (error.response) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });

        res.status(200).json({
            message: 'Token refreshed successfully',
            idToken: response.data.id_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in
        });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to refresh token' });
    }
};