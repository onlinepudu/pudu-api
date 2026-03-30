const axios = require('axios');

module.exports = async (req, res) => {
    // CORS ಸೆಟ್ಟಿಂಗ್ಸ್ (ಬ್ಲಾಗರ್ ನಿಂದ ಫೈಲ್ ಬರಲು ಅನುಮತಿ)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // ನಿಮ್ಮ ಅಸಲಿ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಹಾಕಿ
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06'; 
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e';

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            // ಹಂತ 1: iLovePDF ನಲ್ಲಿ ಟಾಸ್ಕ್ ಶುರು ಮಾಡುವುದು
            const startResponse = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', {
                public_key: PUBLIC_KEY
            });

            // ನಮಗೆ ಸಿಕ್ಕ ಸರ್ವರ್ ಮತ್ತು ಟಾಸ್ಕ್ ಐಡಿ
            const server = startResponse.data.server;
            const task = startResponse.data.task;

            // ಹಂತ 2: ಎಲ್ಲವೂ ಸರಿಯಾಗಿದ್ದರೆ ಬ್ಲಾಗರ್ ಗೆ ಮಾಹಿತಿ ಕಳುಹಿಸುವುದು
            res.status(200).json({
                status: "Success",
                server: server,
                task: task,
                message: "Pudu API is connected with iLovePDF!"
            });

        } catch (error) {
            res.status(500).json({ 
                status: "Error", 
                message: "Connection to iLovePDF failed", 
                details: error.message 
            });
        }
    } else {
        res.status(200).json({ message: "Pudu API is Ready to Convert!" });
    }
};
