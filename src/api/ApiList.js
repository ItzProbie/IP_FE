import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://be-ihi.vercel.app/api/v1',
});

// Login

const sendotp = (data) => {
	return axiosInstance.post('/auth/sendOtp', data);
};

const signup = (data) => {
	return axiosInstance.post('/auth/signup', data);
};

const login = (data) => {
	return axiosInstance.post('/auth/login', data);
};

// Domain

const createdomain = (data) => {
	return axiosInstance.post('/domain/createDomain', data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const getDomains = () => {
	// Data is role
	return axiosInstance.get('/domain/getDomains', {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const getDomainName = (data) => {
	console.log(data);
	return axiosInstance.get(`/domain/getDomain/${data}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const deleteDomain = (data) => {
	return axiosInstance.delete(`/domain/deleteDomain${data}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

// Internship

const createInternship = (data) => {
	// Data ={ domain, startdate , enddate , description(optional)}
	console.log(data);
	return axiosInstance.post('/internship/createInternship', data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const getInternship = () => {
	return axiosInstance.get('/internship/getInternships', {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const applyInternship = (data) => {
	return axiosInstance.post('/internship/apply', data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
};

const changeInternStatus = (data) => {
	return axiosInstance.post('/internship/changeState', data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

const getInternshipDetails = () => {
	if(localStorage.getItem("userRole")==="Student"){
		return axiosInstance.get(`/internship/getStudentInternshipDetails`,{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	}else{
		return axiosInstance.get(`/internship/getTeacherInternshipDetails`,{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	}
	// return axiosInstance.get(`/internship/getInternshipDetails`,{
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 			},
	// 		});
};

const acceptIntern = (data) => {
	return axiosInstance.post('/internship/acceptApplicant', data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

const rejectIntern = (data) => {
	return axiosInstance.post('/internship/rejectApplicant', data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

// User

const getUser = () => {
	return axiosInstance.get('/user/getUser', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

const deleteuser = () => {
	return axiosInstance.delete('/user/deleteUser', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

const changedp = (formData) => {
	return axiosInstance.put('/user/changeDp', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
};

const Requests = {
	// login
	sendotp,
	signup,
	login,
	// Domain
	getDomains,
	createdomain,
	getDomainName,
	deleteDomain,
	// User
	changedp,
	deleteuser,
	getUser,
	// Internship
	//  - Teacher
	rejectIntern,
	acceptIntern,
	createInternship,
	changeInternStatus,

	//  - Student
	applyInternship,
	getInternship,
	getInternshipDetails
};

export default Requests;
    
