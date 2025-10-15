const sumbitForm = document.querySelector('#loginform');
const emailInput = document.querySelector('#username')
const pwdInput = document.querySelector('#password')
const confirmdInput = document.querySelector('#confirmPassword')


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


emailInput.addEventListener('blur', () => {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const existing = emailInput.parentElement.querySelector('.eMessage');
    if (existing) existing.remove();


    if (email === '') {
        showError(emailInput, '이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
        showError(emailInput, '잘못된 이메일 형식입니다');
    } else {
        clearError(emailInput);
    }
});


pwdInput.addEventListener('blur', (e) => {
    const password = pwdInput.value.length;


    if (password === 0) {
        showError(pwdInput, '비밀번호를 입력해주세요.');
    } else if (password < 8) {
        showError(pwdInput, '비밀번호를 8자 이상 입력해주세요.');
    } else {
        clearError(pwdInput);
    }
})

confirmdInput.addEventListener('blur', (e) => {
    const password = pwdInput.value.length;
    const confirmd = confirmdInput.value.length

    if (confirmd === '') {
        showError(confirmdInput, '비밀번호를 입력해주세요.');
    } else if (confirmd.length < 8) {
        showError(confirmdInput, '비밀번호를 8자 이상 입력해주세요.');
    } else if (confirmd !== password) {
        showError(confirmdInput, '비밀번호가 일치하지 않습니다.');
    } else {
        clearError(confirmdInput);
    }
}); 