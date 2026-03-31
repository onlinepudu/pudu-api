const axios = require('axios');

module.exports = async (req, res) => {
    // CORS Headers - ಬ್ಲಾಗರ್ ಗೆ ಅನುಮತಿ
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ನಿಮ್ಮ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ನಲ್ಲಿದ್ದ ಅಸಲಿ ಕೀಗಳು ಇಲ್ಲಿರಲಿ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';

    if (req.method === 'POST') {
        try {
            // iLovePDF ನ ಅಧಿಕೃತ 'Start Task' ಎಂಡ್‌ಪಾಯಿಂಟ್
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಸರ್ವರ್ ಮತ್ತು ಟಾಸ್ಕ್ ಐಡಿ ಕಳುಹಿಸುವುದು
            return res.status(200).json(response.data);
        } catch (error) {
            // ಎರರ್ ಸಂದೇಶವನ್ನು ಸರಿಯಾಗಿ ಓದುವಂತೆ ಮಾಡುವುದು
            const detailedError = error.response ? error.response.data : error.message;
            return res.status(200).json({ 
                status: "Error", 
                message: detailedError 
            });
        }
    }

    return res.status(200).json({ message: "Pudu API is Ready!" });
};
