const axios = require('axios');

module.exports = async (req, res) => {
    // CORS Headers (ಬ್ಲಾಗರ್ ಕನೆಕ್ಷನ್ ಗಾಗಿ)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // --- ನಿಮ್ಮ ಅಸಲಿ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಹಾಕಿ ---
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; // ಇಲ್ಲಿ ನಿಮ್ಮ Secret Key ಹಾಕಿ

    if (req.method === 'POST') {
        try {
            // iLovePDF ಗೆ ರಿಕ್ವೆಸ್ಟ್ ಕಳುಹಿಸುವುದು
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            }, {
                headers: {
                    'Authorization': `Bearer ${SECRET_KEY}` // ಇಲ್ಲಿ ಸೀಕ್ರೆಟ್ ಕೀ ಬಳಕೆಯಾಗುತ್ತದೆ
                }
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಡೇಟಾ ಕಳುಹಿಸುವುದು
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ 
                status: "Error", 
                message: error.response ? error.response.data : error.message 
            });
        }
    }

    return res.status(200).json({ message: "Pudu Engine is Online with Secret Key!" });
};
