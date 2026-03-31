const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // ನಿಮ್ಮ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ನಲ್ಲಿರುವ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಹಾಕಿ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';

    if (req.method === 'POST') {
        try {
            // ಹೊಸ URL: ಕೇವಲ 'start' ಬದಲಿಗೆ ಪೂರ್ಣ ಪಾತ್ ಬಳಸುತ್ತಿದ್ದೇವೆ
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });
            return res.status(200).json(response.data);
        } catch (error) {
            const errorMsg = error.response ? error.response.data : error.message;
            return res.status(200).json({ status: "Error", message: errorMsg });
        }
    }
    return res.status(200).json({ message: "Pudu API Active" });
};
