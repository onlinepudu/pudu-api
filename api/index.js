const axios = require('axios');

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // --- ನಿಮ್ಮ ಅಸಲಿ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ ---
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = ''secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e'; // ನಿಮ್ಮ iLovePDF Secret Key ಇಲ್ಲಿರಲಿ

    if (req.method === 'POST') {
        try {
            // ಹಂತ 1: ಕೆಲಸ ಶುರು ಮಾಡುವುದು (ಇಲ್ಲಿ ಕೇವಲ Public Key ಸಾಕು)
            const startResponse = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            // ಹಂತ 2: ಮುಂದಿನ ಕೆಲಸಗಳಿಗೆ Secret Key ಬಳಕೆಯಾಗುತ್ತದೆ (ಅದು ಸರ್ವರ್ ಒಳಗಡೆ ನಡೆಯುತ್ತದೆ)
            // ಸದ್ಯಕ್ಕೆ ಕನೆಕ್ಷನ್ ಚೆಕ್ ಮಾಡಲು ಈ ಕೆಳಗಿನ ಡೇಟಾ ಕಳುಹಿಸುತ್ತಿದ್ದೇವೆ
            res.status(200).json({
                status: "Success",
                server: startResponse.data.server,
                task: startResponse.data.task
            });

        } catch (error) {
            res.status(500).json({ status: "Error", message: error.message });
        }
    } else {
        res.status(200).json({ message: "Online Pudu API is Active!" });
    }
};
