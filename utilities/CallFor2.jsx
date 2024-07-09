import axios from 'axios';
import GlobalProperties from './GlobalPropperties';

const getToken = () => {
    const user = sessionStorage.getItem('token') || null;
    const data = user ? JSON.parse(user) : null;
    return data ? data : null;
}

const UrlType = {
    TEST: 'TEST',
    LIVE: 'LIVE',
    LOCAL: 'LOCAL'
};

const CallFor2 = async (requestUrl, method, data, headerType) => {
    let url = '';
    // if (GlobalProperties.environment === UrlType.LIVE) {
    //     url = GlobalProperties.urlParam + requestUrl;
    // } else if (GlobalProperties.environment === UrlType.TEST) {
    //     url = GlobalProperties.testParam + requestUrl;
    // } else {
    url = GlobalProperties.ezeo_shopmystation + requestUrl;
    // }

    const headers = {};

    switch (headerType) {
        case 'withoutAuth':
            headers['Content-Type'] = 'application/json';
            break;
        case 'Auth':
            // headers['authorization'] = 'Bearer ' + getToken();
            headers['Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjoxLCJleHAiOjE3MzQ3NzY3NDIuMH0.Ry59TosqpfR7rOjt9BznbMWUgzcAYcrokl00AoRplGs';
            headers['Content-Type'] = 'application/json';
            break;
        case 'authWithoutContentType':
            headers['authorization'] = 'Bearer ' + getToken();
            break;
        case 'authWithContentTypeMultipart':
            headers['Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcklkIjoxLCJleHAiOjE3MzQ3NzY3NDIuMH0.Ry59TosqpfR7rOjt9BznbMWUgzcAYcrokl00AoRplGs';
            headers['Content-Type'] = 'multipart/form-data';
            break;
        default:
            break;
    }

    try {
        const response = await axios({
            url,
            method,
            headers,
            data
        });
        return response;
    } catch (error) {
        // handleError(error);
        // return {
        //     status: 500,
        //     message: 'Server Error Found'
        // };
    }
}

export default CallFor2;