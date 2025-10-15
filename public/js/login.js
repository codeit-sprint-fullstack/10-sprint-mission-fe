const submitForm = document.querySelector('#loginform');
const signUpForm = document.querySelector('#signupform');

const emailInput = document.querySelector('#username')
const pwdInput = document.querySelector('#password')

const loginBtn = document.querySelector('#loginbtn')

const pwdEye = document.querySelector('#pwdEye')

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
function findUserByEmail(email) {
    const target = email.trim().toLowerCase();
    return USER_DATA.some(u => u.email.toLowerCase() === target)
}


function dobblePassword(password) {
    const target = password;
    return USER_DATA.some(u => u.password === target);
}

function modal(message) {
    const overlay = document.createElement('div')
    overlay.classList.add('modal-overlay')

    const modal = document.createElement('div');
    modal.classList.add('modal')

    const msg = document.createElement('p')
    msg.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button'
    closeBtn.textContent = '확인'
    closeBtn.classList.add('modal-close')
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    modal.append(msg, closeBtn);
    overlay.append(modal);
    document.body.append(overlay);
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

function updateBtn() {
    const emailOk = isEmailValid(emailInput.value);
    const pwdOk = isPwdValid(pwdInput.value);

    const allOk = emailOk && pwdOk;

    loginBtn.disabled = !allOk;
    loginBtn.setAttribute('aria-disabled', String(!allOk));
    loginBtn.classList.toggle('clearBtn', allOk);
}


emailInput.addEventListener('input', updateBtn);
pwdInput.addEventListener('input', updateBtn);

emailInput.addEventListener('blur', emailCheck);
pwdInput.addEventListener('blur', passWordCheck);



submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok1 = emailCheck();
    const ok2 = passWordCheck();
    updateBtn();
    if (!ok1 || !ok2) return;

    const user = findUserByEmail(emailInput.value);
    if (!user) {
        modal('등록되지 않은 이메일 입니다.')
        return;
    }

    if (user.password !== pwdInput.value) {
        modal('비밀번호가 일치하지 않습니다.');
        return;
    }
    window.location.assign('/items');
})


// 눈모양 비번
pwdEye.addEventListener('click', (e) => {
    e.preventDefault();

    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
    } else {
        pwdInput.type = 'password';
    }
})