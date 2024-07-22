let pathArray = window.location.pathname.split('/');
if (pathArray[pathArray.length - 1] === 'dashboard.html') {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('full_name').innerHTML = userData?.first_name + " " + userData?.last_name;
        document.getElementById('f_name').innerHTML = userData?.first_name;
        document.getElementById('l_name').innerHTML = userData?.last_name;
        document.getElementById('u_name').innerHTML = userData?.username;
        document.getElementById('_email').innerHTML = userData?.email;
    } else {
        window.location = './login.html';
    }
}

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
            alert(response?.data?.Message);
        }
    } catch (err) {
        alert(err?.response?.data?.Message);
    }
}

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
            localStorage.setItem('userData', JSON.stringify(response?.data?.data));
            window.location = './dashboard.html';
            alert(response?.data?.Message);
        }
    } catch (err) {
        alert(err?.response?.data?.Message);
    }
}

const handleChangePassword = async () => {
    event.preventDefault();
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
        alert('Something went wrong!\nPlease Login again to continue.');
        window.location = './login.html';
        return;
    }

    let old_password = document.getElementById('current_password').value;
    let new_password = document.getElementById('new_password').value;
    let confirm_password = document.getElementById('confirm_password').value;
    let headers = {
        authorization: userData?.token
    }
    const data = {
        old_password,
        new_password,
        confirm_password
    };

    try {
        let response = await axios.post("http://localhost:5000/user/change_password", data, { headers: headers });

        if (response?.status === 200) {
            alert(response?.data?.Message);
            document.getElementById('change_password').reset();
        }

    } catch (err) {
        alert(err?.response?.data?.Message);
    }
}

const logout = async () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let headers = {
        authorization: userData?.token
    }
    try {
        let response = await axios.get("http://localhost:5000/user/sign_out", { headers: headers });

        if (response?.status === 200) {
            localStorage.clear('userData');
            window.location = './login.html';
            alert(response?.data?.Message);
        }
    } catch (err) {
        alert(err?.response?.data?.Message);
    }
}