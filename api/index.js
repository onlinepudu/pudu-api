const axios = require('axios');

module.exports = async (req, res) => {
    // ಬ್ಲಾಗರ್ ಗೆ ಪೂರ್ಣ ಅನುಮತಿ (CORS Fix)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ನಿಮ್ಮ ಅಸಲಿ ಕೀಗಳನ್ನು ಇಲ್ಲಿ ಹಾಕಿ (ಕಣ್ಣಿನ ಐಕಾನ್ ಒತ್ತಿ ಕಾಪಿ ಮಾಡಿದ ಸೀಕ್ರೆಟ್ ಕೀ ಬಳಸಿ)
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e';

    if (req.method === 'POST') {
        try {
            // ಹಂತ 1: ಸೀಕ್ರೆಟ್ ಕೀ ಬಳಸಿ iLovePDF ಜೊತೆ ಕನೆಕ್ಷನ್ ಆರಂಭಿಸುವುದು
            const response = await axios.post('https://api.ilovepdf.com/v1/start/imagepdf', 
            {
                public_key: PUBLIC_KEY
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                    // ಗಮನಿಸಿ: ಕೆಲವು ಹೊಸ ವರ್ಷನ್ ಗಳಲ್ಲಿ Authorization ಹೆಡರ್ ಇಲ್ಲದೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ
                    // ಆದರೆ ಸೀಕ್ರೆಟ್ ಕೀ ಬಳಸಿ ಕಳುಹಿಸುವುದು ಹೆಚ್ಚು ಸುರಕ್ಷಿತ
                }
            });

            // ಯಶಸ್ವಿಯಾದರೆ ಬ್ಲಾಗರ್ ಗೆ ಡೇಟಾ ಕಳುಹಿಸುವುದು
            return res.status(200).json(response.data);

        } catch (error) {
            // ಅಸಲಿ ಎರರ್ ಏನಿದೆ ಎಂದು ಬ್ಲಾಗರ್ ಗೆ ತಿಳಿಸುವುದು
            const errorData = error.response ? error.response.data : { message: error.message };
            return res.status(200).json({ 
                status: "Error", 
                message: errorData 
            });
        }
    }

    return res.status(200).json({ message: "Pudu API is Active with Secret Key!" });
};
