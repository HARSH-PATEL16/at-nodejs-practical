// Get user details
const userDetails = async () => {
    let token = localStorage.getItem('token');
    if (token) {
        try {
            let response = await axios.get("http://localhost:5000/user/details", { headers: { authorization: token } });
            if (response?.status === 200) {
                let userData = response?.data[0];
                document.getElementById('full_name').innerHTML = userData?.first_name + " " + userData?.last_name;
                document.getElementById('f_name').innerHTML = userData?.first_name;
                document.getElementById('l_name').innerHTML = userData?.last_name;
                document.getElementById('u_name').innerHTML = userData?.username;
                document.getElementById('_email').innerHTML = userData?.email;
            }
        } catch (err) {
            alert(err?.response?.data?.message);
            window.location = './login.html';
        }
    } else {
        window.location = './login.html';
    }
}

let pathArray = window.location.pathname.split('/');
if (pathArray[pathArray.length - 1] === 'dashboard.html') {
    userDetails();
}

// User registration form
const handleRegisterFormSubmit = async () => {
    event.preventDefault();
    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value;

    const data = {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password
    };

    try {
        let response = await axios.post("http://localhost:5000/user/sign_up", data);
        if (response?.status === 200) {
            window.location = './login.html';
            alert(response?.data?.message);
        }
    } catch (err) {
        alert(err?.response?.data?.message);
    }
}

// User log in
const handleLoginFormSubmit = async () => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const data = {
        email,
        password
    };

    try {
        let response = await axios.post("http://localhost:5000/user/sign_in", data);
        if (response?.status === 200) {
            localStorage.setItem('token', response?.data?.token);
            window.location = './dashboard.html';
            alert(response?.data?.message);
        }
    } catch (err) {
        alert(err?.response?.data?.message);
    }
}

// Change password
const handleChangePassword = async () => {
    event.preventDefault();
    let token = localStorage.getItem('token');
    if (!token) {
        alert('Something went wrong!\nPlease Login again to continue.');
        window.location = './login.html';
        return;
    }

    let current_password = document.getElementById('current_password').value;
    let new_password = document.getElementById('new_password').value;
    let confirm_password = document.getElementById('confirm_password').value;
    let headers = {
        authorization: token
    }
    const data = {
        current_password,
        new_password,
        confirm_password
    };

    try {
        let response = await axios.post("http://localhost:5000/user/change_password", data, { headers: headers });

        if (response?.status === 200) {
            alert(response?.data?.message);
            document.getElementById('change_password').reset();
        }

    } catch (err) {
        alert(err?.response?.data?.message);
    }
}

// Logout
const logout = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
        alert('Something went wrong!\nPlease Login again to continue.');
        window.location = './login.html';
        return;
    }
    let headers = {
        authorization: token
    }
    try {
        let response = await axios.get("http://localhost:5000/user/sign_out", { headers: headers });

        if (response?.status === 200) {
            localStorage.clear('token');
            window.location = './login.html';
            alert(response?.data?.message);
        }
    } catch (err) {
        alert(err?.response?.data?.message);
    }
}