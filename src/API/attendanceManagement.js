/**
 * Send data to the API
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {object} data - Data to send
 * @returns {Promise<any>} - API response data
 */
const API_DEV_SERVER="https://jsj30c07-5000.inc1.devtunnels.ms/api"
const API_BASE_URL="https://schoolmanagement-api-67878057783.us-central1.run.app/api";
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
async function sendDataDevServer(endpoint, method, data) {
    try {
        const response = await fetch(`${API_DEV_SERVER}/${endpoint}`, {
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
//Post student attendance data
export async function postStudentAttendanceData(postStAttendance) {
  try {
    const res = await sendData("attendance/student", "POST", postStAttendance);
    console.log("Response:", res);
    return res;
  } catch (error) {
    console.error(`Error saving attendance for student ${postStAttendance.student_id}:`, error);
    throw error;
  }
}
// PUT student attendance
export async function updateStudentAttendanceData(data) {
  try {
    const response = await sendData(`attendance/${data.student_id}/update`,"PUT",data);
    if (!response.ok) throw new Error("Failed to update attendance record.");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//Post Staff Attendance
export async function postStaffAttendanceData(postStfAttendance) {
  try {
    const res = await sendData("attendance/staff","POST",postStfAttendance);
    console.log("Response:", res);
    return res;
  } catch (error) {
    console.error(`Error saving attendance for student ${postStfAttendance.staff_id}:`, error);
    throw error;
  }
}
//PUT
export async function updateStaffAttendanceData(data) {
  try {
    const response = await sendData(`attendance/staff/update`,"PUT",data);
    if (!response.ok) throw new Error("Failed to update attendance record.");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}