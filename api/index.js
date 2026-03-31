const axios = require('axios');

module.exports = async (req, res) => {
    // CORS ಸೆಟ್ಟಿಂಗ್ಸ್
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // ನಿಮ್ಮ ಅಸಲಿ ಕೀಗಳು ಇಲ್ಲಿರಲಿ (ಇನ್ನೊಮ್ಮೆ ಪರೀಕ್ಷಿಸಿ ಪೇಸ್ಟ್ ಮಾಡಿ)
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06'; 
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e';

    if (req.method === 'POST') {
        try {
            // ಹೊಸ URL: iLovePDF ನ ಹೊಸ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಲಿಂಕ್ ಬಳಸಿ
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            }, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });

            return res.status(200).json(response.data);
        } catch (error) {
            // ಇಲ್ಲಿ ಅಸಲಿ ಸಮಸ್ಯೆಯನ್ನು ಪತ್ತೆ ಹಚ್ಚುತ್ತೇವೆ
            console.error("iLovePDF Error:", error.message);
            return res.status(200).json({ 
                status: "Error", 
                message: error.response ? error.response.data : error.message 
            });
        }
    }
    return res.status(200).json({ message: "Pudu Engine Online" });
};
