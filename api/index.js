const axios = require('axios');

module.exports = async (req, res) => {
    // --- CORS Headers ಅಳವಡಿಕೆ (ಬ್ಲಾಗರ್ ಕನೆಕ್ಷನ್ ಗಾಗಿ) ---
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // ಇದು ಎಲ್ಲರಿಗೂ ಅನುಮತಿ ನೀಡುತ್ತದೆ
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

    // OPTIONS ರಿಕ್ವೆಸ್ಟ್ ಗೆ 200 OK ಉತ್ತರ (ಇದು ಬಹಳ ಮುಖ್ಯ)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // ನಿಮ್ಮ iLovePDF ಕೀಗಳು
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; 

    if (req.method === 'POST') {
        try {
            // iLovePDF ನಲ್ಲಿ ಟಾಸ್ಕ್ ಆರಂಭಿಸುವುದು
            const startResponse = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಬ್ಲಾಗರ್ ಗೆ ಸರ್ವರ್ ಮಾಹಿತಿ ಕಳುಹಿಸುವುದು
            res.status(200).json(startResponse.data);
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ status: "Error", message: error.message });
        }
    } else {
        res.status(200).json({ message: "Pudu API is Ready to Convert!" });
    }
};
