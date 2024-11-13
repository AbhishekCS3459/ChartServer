// config/api.ts
const API_BASE_URL = 'https://chartserver-l6ah.onrender.com'

const API_ENDPOINTS = {
  getLogs: `${API_BASE_URL}/api/logs/get`,
  submitLog: `${API_BASE_URL}/api/chart/access`,
  getChartData: `${API_BASE_URL}/api/chart/data`,
};

export { API_BASE_URL, API_ENDPOINTS };
