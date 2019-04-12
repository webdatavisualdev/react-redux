import axios from 'axios';
import { history } from './history';

const API = 'http://localhost:3001/';

export const userService = {
    login,
    silentLogin,
    signup,
    getRooms,
    checkToken,
    logout,
    createWorkspace,
    getAllWorkspaces,
    getMessages,
    getUsers,
    addRoom,
    sendAvailableWorkspaces,
};

function login(data) {
    return axios.post(API + 'login', data).then((res) => handleResponse(res));
}

function silentLogin() {
    if (sessionStorage.getItem('token')) {
        return checkToken();
    } else if (localStorage.getItem('email') && localStorage.getItem('password')) {
        return login(localStorage.getItem('email'), localStorage.getItem('password'));
    } else {
        return Promise.reject(false);
    }
}

function signup(data) {
    return axios.post(API + 'signup', data).then((res) => handleResponse(res));
}

function createWorkspace(data) {
    return axios.post(API + 'workspace', data).then((res) => handleResponse(res));
}

function getMessages(data) {
    return axios.post(API + 'getMessages', data).then((res) => handleResponse(res));
}

function getRooms(workspaceId) {
    return axios.post(API + 'getRooms', {
        token: sessionStorage.getItem('token'),
        workspaceId: workspaceId
    }).then((res) => handleResponse(res));
}

function getUsers(data) {
    return axios.post(API + 'getUsers', data).then((res) => handleResponse(res));
}

function addRoom(data) {
    return axios.post(API + 'addRoom', data).then((res) => handleResponse(res));
}

function getAllWorkspaces() {
    return axios.post(API + 'getWorkspaces').then((res) => handleResponse(res));
}

function checkToken() {
    return axios.post(API + 'checkToken', {
        token: sessionStorage.getItem('token')
    }).then((res) => handleResponse(res));
}

function sendAvailableWorkspaces(data) {
    return axios.post(API + 'sendAvailableWorkspaces', data).then((res) => handleResponse(res));
}

function logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    history.push('/workspace');
}

function handleResponse(res) {
    return res.data;
}

