const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // ನಿಮ್ಮ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ನಲ್ಲಿರುವ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06'; 
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; // ಆ ಕಣ್ಣಿನ ಗುರುತಿನ ಮೇಲೆ ಒತ್ತಿ ಕಾಪಿ ಮಾಡಿ

    if (req.method === 'POST') {
        try {
            // ಪ್ರಮುಖ ಬದಲಾವಣೆ: ಪೂರ್ಣ ಡೊಮೈನ್ ಜೊತೆ ಕಳುಹಿಸುವುದು
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            return res.status(200).json(response.data);
        } catch (error) {
            // ಒಂದು ವೇಳೆ imagepdf ಸಿಗದಿದ್ದರೆ 'officepdf' ಅಥವಾ 'compress' ಟ್ರೈ ಮಾಡಿ ನೋಡಲು
            return res.status(400).json({ 
                status: "Error", 
                details: error.response ? error.response.data : error.message 
            });
        }
    }
    return res.status(200).json({ message: "Pudu API is Ready!" });
};
