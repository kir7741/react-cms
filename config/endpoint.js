export const DEV_IP = 'http://localhost';
export const API_ENDPOINT_DEV_PORT = 9002;
export const SELF_HOST_ENDPOINT_DEV_PORT = 3002;

export const HOST_MAP = {
	dev: `${DEV_IP}:${API_ENDPOINT_DEV_PORT}`,
	develop: 'http://lab.25sprout.com',
	production: 'http://lab.25sprout.com',
};

const SELF_HOST_MAP = {
	dev: `${DEV_IP}:${SELF_HOST_ENDPOINT_DEV_PORT}`,
	develop: '',
	production: '',
};

export const API_ENDPOINT = HOST_MAP[process.env.API];
export const SELF_HOST_ENDPOINT = SELF_HOST_MAP[process.env.API];

export default {
	// Set API endpoint
	API_ENDPOINT: `"${API_ENDPOINT}"`,
	SELF_HOST_ENDPOINT: `"${SELF_HOST_ENDPOINT}"`,
};
