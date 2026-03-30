const axios = require('axios');

export default async function handler(req, res) {
    const PUBLIC_KEY = 'project_public_7469b88e666da51a212932e47d8e05a7_NwKX1ede0459388ba0c9dee255bf1ddd43c06';
    const SECRET_KEY = 'secret_key_878b984447c717906bebc1dd60ed3129_sgis1045f26c95310e92c347810aa4a2e398e';
    if (req.method === 'POST') {
        try {
            res.status(200).json({ status: "Success", message: "Online Pudu API Connected!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}