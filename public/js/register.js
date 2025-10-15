const signUpForm = document.querySelector('#signupform');
const emailInput = document.querySelector('#username')

const pwdInput = document.querySelector('#password')
const confirmdInput = document.querySelector('#confirmPassword')

const signUpBtn = document.querySelector('.signupbtn')


const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]



function clearError(input) {
    input.classList.remove('errborder');
    const exist = input.parentElement.querySelector('.eMessage');
    if (exist) {
        exist.remove();
    }
}


function showError(input, message) {
    clearError(input)
    input.classList.add('errborder');
    const span = document.createElement('span');
    span.classList.add('eMessage')
    span.textContent = message
    input.parentElement.append(span);
}

const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPwdValid = (v) => v.length >= 8;


function emailCheck() {
    const v = emailInput.value;
    if (v.trim() === '') {
        showError(emailInput, '이메일을 입력해주세요.'); return false;
    }
    if (!isEmailValid(v)) {
        showError(emailInput, '잘못된 이메일 형식입니다'); return false;
    }
    clearError(emailInput);
    return true;
}


function passWordCheck() {
    const v = pwdInput.value;

    if (v.length === 0) {
        showError(pwdInput, '비밀번호를 입력해주세요.'); return false;
    }
    if (!isPwdValid(v)) {
        showError(pwdInput, '비밀번호를 8자 이상 입력해주세요.');
        return false;
    }

    clearError(pwdInput);
    return true;
}

function confirmdCheck() {
    const c = confirmdInput.value;
    const v = pwdInput.value;

    if (c.length === 0) {
        showError(confirmdInput, '비밀번호를 입력해주세요.'); return false;
    }
    if (!isPwdValid(c)) {
        showError(confirmdInput, '비밀번호를 8자 이상 입력해주세요.');
        return false;
    }
    if (c !== v) {
        showError(confirmdInput, '비밀번호가 일치하지 않습니다.')
        return false;
    }
    clearError(confirmdInput);
    return true;
}

function updateBtn() {
    const emailOk = isEmailValid(emailInput.value);
    const pwdOk = isPwdValid(pwdInput.value);
    const confirmOk = isPwdValid(confirmdInput.value) && (confirmdInput.value === pwdInput.value);

    const allOk = emailOk && pwdOk && confirmOk;


    signUpBtn.disabled = !allOk;
    signUpBtn.setAttribute('aria-disabled', String(!allOk));
    signUpBtn.classList.toggle('clearBtn', allOk);

    if (!errorCheck) {
        signUpBtn.classList.add('clearBtn');
    } else {
        signUpBtn.classList.remove('clearBtn');
    }
}

emailInput.addEventListener('input', updateBtn);
pwdInput.addEventListener('input', updateBtn);
confirmdInput.addEventListener('input', updateBtn);


emailInput.addEventListener('blur', emailCheck);
pwdInput.addEventListener('blur', passWordCheck);
confirmdInput.addEventListener('blur', confirmdCheck);



signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok1 = emailCheck();
    const ok2 = passWordCheck();
    const ok3 = confirmdCheck();
    updateBtn();
    if (!ok1 || !ok2 || !ok3) return;

    window.location.assign('/items');
})


