const emailInput = document.getElementById('email');

const errorMessage = document.querySelectorAll('.error-message');
const emailError = errorMessage[0];
const passwordError = errorMessage[1];

const submitButton = document.querySelector('button');
const form = document.querySelector('form');

console.log('요소 선택 완료'); /*확인용*/

function isEmpty(value) {
   if (value.trim() === '') {
        return true;
     } else {
        return false;
     }
} 

function isValidPassword(password) {

    if (password.length < 8) {
        return false;
    } else {
        return true;
    }   
}

/*정규 표현식은 잘 모르는 부분이라 Ai 도움을 받았습니다.*/

function isValidEmail(email) {
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return emailPattern.test(email);
}

function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

emailInput.addEventListener('focusout', function() {
    const value = emailInput.value;

    if (isEmpty(value)) {
        showError(emailInput, emailError, '이메일을 입력해주세요.');
        return;
    }
    
    if (!isValidEmail(value)) {
        showError(emailInput, emailError, '잘못된 이메일 형식입니다.');
        return;
    }

    hideError(emailInput, emailError);
});


passwordInput.addEventListener('focusout', function() {
    const value = passwordInput.value;

    if (isEmpty(value)) {
        showError(passwordInput, passwordError, '비밀번호를 입력해주세요.');
        return;
    }
    
    if (!isValidPassword(value)) {
        showError(passwordInput, passwordError, '비밀번호는 최소 8자 이상 입력해주세요.');
        return;
    }
    
    hideError(passwordInput, passwordError);

});

function checkButtonState() {
    
    const emailValue = emailInput.value;
    
    const passwordValue = passwordInput.value;

    const isEmailValid = !isEmpty(emailValue) && isValidEmail(emailValue);
    
    const isPasswordValid = !isEmpty(passwordValue) && isValidPassword(passwordValue);
    
    if (isEmailValid && isPasswordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }       
}


emailInput.addEventListener('input', checkButtonState);
passwordInput.addEventListener('input', checkButtonState);

checkButtonState();

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const user = USER_DATA.find((user) => user.email === emailValue);

    if (!user || user.password !== passwordValue) {
            alert ('비밀번호가 일치하지 않습니다.');
        } else {
            window.location.href = '/items';
        }
    });
    