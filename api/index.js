const axios = require('axios');

module.exports = async (req, res) => {
    // ಬ್ಲಾಗರ್ ಇಂದ ಫೈಲ್ ಬರಲು ಈ ಸೆಟ್ಟಿಂಗ್ಸ್ ಕಡ್ಡಾಯ
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    
    // ನಿಮ್ಮ ಅಸಲಿ Secret Key ಇಲ್ಲಿರಲಿ
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; 

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });
            res.status(200).json(response.data);
        } catch (error) {
            // Error ಬಂದರೆ ಇಲ್ಲಿ ತಿಳಿಯುತ್ತದೆ
            res.status(422).json({ error: "Validation Failed", details: error.message });
        }
    } else {
        res.status(200).json({ message: "Online Pudu Backend is Ready!" });
    }
};
