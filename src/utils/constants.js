//Texts
export const FILLER_TEXT = `—————`;

//Constants
export const LOADER_TYPE = 'Oval';
export const LOADER_COLOR = '#F46224';
export const DOC_TITLE_LENGTH = 50;

//Keys
export const USER_THEME_PREFERENCE = `user_theme_preference`;

//HTTP Response Categories
export const HTTP_SUCCESS = [200, 201, 202, 204];
export const HTTP_REDIRECT = [300, 301, 302, 303, 307];
export const HTTP_CLIENT_ERROR = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 415];
export const HTTP_SERVER_ERROR = [500, 501, 502, 503, 504, 505];

//API BASE URL
export const BASE_URL = 'http://localhost:8000'

//API Endpoints
export const LOGIN = `${BASE_URL}/api/v1/auth/login`;
export const SIGNUP = `${BASE_URL}/api/v1/auth/signup`;
export const CUSTOMERS = `${BASE_URL}/api/v1/customers`;
export const POLICIES = `${BASE_URL}/api/v1/policies`;
export const INSURANCES = `${BASE_URL}/api/v1/insurances`;