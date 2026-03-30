const axios = require('axios');

module.exports = async (req, res) => {
    // ಬ್ಲಾಗರ್ ಇಂದ ಫೈಲ್ ಬರಲು ಈ ಸೆಟ್ಟಿಂಗ್ಸ್ ಅವಶ್ಯಕ (CORS)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // ನಿಮ್ಮ iLovePDF ಕೀಗಳು ಇಲ್ಲಿವೆ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; // ನಿಮ್ಮ ಅಸಲಿ Secret Key ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            // iLovePDF ನಲ್ಲಿ ಫೈಲ್ ಕನ್ವರ್ಟ್ ಮಾಡುವ ಟಾಸ್ಕ್ ಶುರು ಮಾಡುವುದು
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });
            
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: "iLovePDF ಗೆ ಕನೆಕ್ಟ್ ಆಗಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ", details: error.message });
        }
    } else {
        // ಸುಮ್ಮನೆ ಲಿಂಕ್ ಓಪನ್ ಮಾಡಿದರೆ ಈ ಮೆಸೇಜ್ ಕಾಣಿಸುತ್ತದೆ
        res.status(200).json({ message: "Online Pudu Backend is Ready to Convert!" });
    }
};
