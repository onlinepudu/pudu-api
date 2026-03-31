const axios = require('axios');

module.exports = async (req, res) => {
    // CORS Headers - ಬ್ಲಾಗರ್ ಗೆ ಅನುಮತಿ
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // ನಿಮ್ಮ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; // ಕಣ್ಣಿನ ಐಕಾನ್ ಒತ್ತಿ ಕಾಪಿ ಮಾಡಿದ ಕೀ ಇಲ್ಲಿರಲಿ

    if (req.method === 'POST') {
        try {
            // ಹೊಸ ಮತ್ತು ಸರಿಯಾದ iLovePDF URL
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಬ್ಲಾಗರ್ ಗೆ ಮಾಹಿತಿ ಕಳುಹಿಸುವುದು
            return res.status(200).json(response.data);

        } catch (error) {
            // ಅಸಲಿ ಸಮಸ್ಯೆ ಏನೆಂದು ತಿಳಿಯಲು ಈ ಕೆಳಗಿನ ಮೆಸೇಜ್ ಕಳುಹಿಸುತ್ತಿದ್ದೇವೆ
            const errorMsg = error.response ? error.response.data : { message: error.message };
            return res.status(200).json({ status: "Error", message: errorMsg });
        }
    }
    return res.status(200).json({ message: "Pudu API is Online with Keys!" });
};
