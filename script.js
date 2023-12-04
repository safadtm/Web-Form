// ----------------- Sign In and Sign Up Validation ----------------------------//

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// validation
function setupSignUpValidation() {
    const signUpForm = document.getElementById('signup-form');
    const signUpUsername = document.getElementById('signUpUsername');
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const signUpPassword2 = document.getElementById('signUpPassword2');

    if (!signUpForm) {
        return; 
    }

    
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        validateSignUpInputs();
    });

    
    const validateSignUpInputs = () => {
        const signUpUsernameValue = signUpUsername.value.trim();
        const signUpEmailValue = signUpEmail.value.trim();
        const signUpPasswordValue = signUpPassword.value.trim();
        const signUpPassword2Value = signUpPassword2.value.trim();

        if (signUpUsernameValue === '') {
            setError(signUpUsername, 'Username is required');
        } else {
            setSuccess(signUpUsername);
        }

        if (signUpEmailValue === '') {
            setError(signUpEmail, 'Email is required');
        } else if (!isValidEmail(signUpEmailValue)) {
            setError(signUpEmail, 'Provide a valid Email address');
        } else {
            setSuccess(signUpEmail);
        }

        if (signUpPasswordValue === '') {
            setError(signUpPassword, 'Password is required');
        } else if (signUpPasswordValue.length < 8) {
            setError(signUpPassword, 'Password must be at least 8 character.')
        } else {
            setSuccess(signUpPassword);
        }

        if (signUpPassword2Value === '') {
            setError(signUpPassword2, 'Please confirm your Password');

        } else if (signUpPassword2Value !== signUpPasswordValue) {
            setError(signUpPassword2, "Passwords doesn't match");
        } else {
            setSuccess(signUpPassword2);
        }

        if (document.querySelectorAll('.success').length === 4) {
            signUpForm.submit();

        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    setupSignUpValidation();
});