/**
 * Send data to the API
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {object} data - Data to send
 * @returns {Promise<any>} - API response data
 */
const API_BASE_URL = "https://schoolmanagement-api-67878057783.us-central1.run.app/api";
async function sendData(endpoint, method, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Failed to ${method} data to ${endpoint}`);
        }
        return await response;
    } catch (error) {
        console.error(`Error sending data to ${endpoint}:`, error);
        throw error;
    }
}
// const API_BASE_URL="http://localhost:5173/";
async function adminAttendanceMngFetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
}



//Post student attenddance data
export async function postStudentAccountData(postStAccount) {
    try {
      await sendData("accounts/add_payment", "POST", postStAccount);
    } catch (error) {
      console.error(`Error saving account for student ${postStAccount.student_id}:`, error);
    }
}

