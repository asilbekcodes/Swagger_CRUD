function getToken() {
    let token = localStorage.getItem('token')
    return token
}


export const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
};