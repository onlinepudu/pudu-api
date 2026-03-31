const axios = require('axios');

module.exports = async (req, res) => {
    // ಬ್ಲಾಗರ್ ಗೆ ಅನುಮತಿ ನೀಡುವ ಹೆಡರ್ಸ್
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ನಿಮ್ಮ ಅಸಲಿ ಪಬ್ಲಿಕ್ ಕೀ ಇಲ್ಲಿದೆ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';

    if (req.method === 'POST') {
        try {
            // ಅತಿ ಮುಖ್ಯ: ಈ URL ಅನ್ನು ಗಮನಿಸಿ (v1/start/imagepdf)
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಬ್ಲಾಗರ್ ಗೆ ಮಾಹಿತಿ ಕಳುಹಿಸುವುದು
            return res.status(200).json(response.data);
            
        } catch (error) {
            // ಎರರ್ ಸಂದೇಶವನ್ನು ಸರಿಯಾಗಿ ತೋರಿಸಲು
            const errorMsg = error.response ? error.response.data : { message: error.message };
            return res.status(200).json({ status: "Error", message: errorMsg });
        }
    }

    return res.status(200).json({ message: "Pudu Engine is Online!" });
};
