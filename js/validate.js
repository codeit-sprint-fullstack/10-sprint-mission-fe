function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
}

function hideError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (errorDiv) {
        errorDiv.classList.remove('show');
        errorDiv.textContent = '';
    }
}

// Test user data
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function validateEmail(email) { //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//login credential check without back-end function
function checkLoginCredentials(email, password) {
    return USER_DATA.find(user => user.email === email && user.password === password);
}


function findUserByCredential(email) {
    return USER_DATA.find(user => user.email === email);
}

//Create Modal dialog show
function showModal(message) {
    const modal = document.getElementById('errorModal'); //modal box
    const modalMessage = document.getElementById('modalMessage');   //error message
    modalMessage.textContent = message;
    modal.classList.add('show');
}
//Remove Modal dialog show
function hideModal() {
    const modal = document.getElementById('errorModal');  //modal box
//    const modalMessage = document.getElementById('modalMessage');   //error message
//    modalMessage.textContent = message;
    modal.classList.remove('show');
}

function updateLoginButtonState() {     //set the submit button on sign-in.html as disabled until input boxes are filled
    const userid = document.getElementById('username');
    const passwd = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    
    if (!userid || !passwd || !submitButton) {
        console.log('Elements not found:', { userid: !!userid, passwd: !!passwd, submitButton: !!submitButton });
        return;
    }
    
    const email = userid.value.trim();
    const password = passwd.value;
    const enabled = Boolean(email && password);  // enable when both fields have values
// I need to search why is not working 
    console.log('Button state:', { email, password, enabled, disabled: !enabled });

    Boolean(email && password) ? submitButton.disabled = false : submitButton.disabled = true;
    //submitButton.disabled = !enabled;   //enabled = form is Valid
    submitButton.style.backgroundColor = !enabled ? '#888888' : '#3692ff';   //button color setting
    submitButton.style.opacity = enabled ? '1' : '0.5'; //when the form is not valid, opacity set as half-transparency
    submitButton.style.cursor = enabled ? 'pointer' : 'not-allowed';
}

// Validation in Login form
function validateLoginForm() {
    let isValid = true;
    const email = document.getElementById('username')?.value.trim() || '';
    const password = document.getElementById('passwordInput')?.value || '';
    if (!email) {
        showError('username', 'emailError', '이메일을 입력해주세요.');
        isValid = false;
    } else if (!validateEmail(email)) {   //Add (!isLoginPage) in if statement to exclude email validation on Sign-in.html
        showError('username', 'emailError', '올바른 이메일 형식을 입력해주세요.');
        isValid = false;
    } else {
        hideError('username', 'emailError');
    }

    if (!password) {
        showError('passwordInput', 'passwordError', '비밀번호를 입력해주세요.');
        isValid = false;
    } else {
        hideError('passwordInput', 'passwordError');
    }
    return isValid;
}

// Validation in Sign-up form
function validateSignupForm() {
    let isValid = true;
    const email = document.getElementById('username')?.value.trim() || '';
    const nickname = document.getElementById('nickname')?.value.trim() || '';
    const password = document.getElementById('passwordInput')?.value || '';
    const passwordConfirm = document.getElementById('passwordInput2')?.value || '';

    if (!email) {
        showError('username', 'emailError', '이메일을 입력해주세요.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('username', 'emailError', '올바른 이메일 형식을 입력해주세요.');
        isValid = false;
    } else {
        hideError('username', 'emailError');
    }

    if (!nickname) {
        showError('nickname', 'nicknameError', '닉네임을 입력해주세요.');
        isValid = false;
    } else if (nickname.length < 4) {
        showError('nickname', 'nicknameError', '닉네임은 4자 이상이어야 합니다.');
        isValid = false;
    } else {
        hideError('nickname', 'nicknameError');
    }

    if (!password) {
        showError('passwordInput', 'passwordError', '비밀번호를 입력해주세요.');
        isValid = false;
    } else if (password.length < 8 || password.length > 20) {
        showError('passwordInput', 'passwordError', '비밀번호는 8자 이상 20자 이하여야 합니다.');
        isValid = false;
    } else {
        hideError('passwordInput', 'passwordError');
    }

    if (!passwordConfirm) {
        showError('passwordInput2', 'passwordConfirmError', '비밀번호 확인을 입력해주세요.');
        isValid = false;
    } else if (password !== passwordConfirm) {
        showError('passwordInput2', 'passwordConfirmError', '비밀번호가 일치하지 않습니다.');
        isValid = false;
    } else {
        hideError('passwordInput2', 'passwordConfirmError');
    }

    return isValid;
}

function showPassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (!input || !toggle) return;
    input.type = 'text';
    toggle.src = './images/eye-open.svg';
    toggle.alt = '비밀번호 숨김';
}

function hidePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (!input || !toggle) return;
    input.type = 'password';
    toggle.src = './images/eye-closed.svg';
    toggle.alt = '비밀번호 표시';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded, checking page type...');
    const form = document.querySelector('form');
    if (!form) {
        console.log('No form found');
        return;
    }
    const isLoginPage = window.location.pathname.includes('sign-in');  // set the sign-in page as a login page
    console.log('isLoginPage:', isLoginPage, 'pathname:', window.location.pathname);

    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordConfirmToggle = document.getElementById('passwordConfirmToggle');
    const nicknameInput = document.getElementById('nickname');
    const passwordConfirmInput = document.getElementById('passwordInput2');

    if (isLoginPage) {
        updateLoginButtonState();   //setting up Login button on Sin-in page 
    } else {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        }
    }

    //Login form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isLoginPage) {
            // Validate form first
            const isValid = validateLoginForm();
            if (!isValid) {
                return false;
            }
            
            // Check login credentials
            const email = document.getElementById('username').value.trim();
            const password = document.getElementById('passwordInput').value;
            
            const user = findUserByCredential(email);
            
            if (!user) {
                // Email not found
                showModal('존재하지 않는 이메일 입니다.');
                return false;
            } else if (user.password !== password) {
                // Password doesn't match
                showModal('비밀번호가 일치하지 않습니다.');
                return false;
            } else {
                // Login successful
                window.location.href = './items.html';
            }
        } else {
            // Sign-up form
            const isValid = validateSignupForm();
            if (isValid) {
                window.location.href = '/';
            }
        }
    });

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (!email) {
                showError('username', 'emailError', '이메일을 입력해주세요.');
            } else if (!validateEmail(email)) {
                showError('username', 'emailError', '올바른 이메일 형식을 입력해주세요.');
            } else {
                hideError('username', 'emailError');
            }
            if (isLoginPage) updateLoginButtonState();
        });
        emailInput.addEventListener('input', function() {
            hideError('username', 'emailError');
            if (isLoginPage) updateLoginButtonState();
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const password = this.value;
            if (!password) {
                showError('passwordInput', 'passwordError', '비밀번호를 입력해주세요.');
            } else if (!isLoginPage && (password.length < 8 || password.length > 20)) {
                showError('passwordInput', 'passwordError', '비밀번호는 8자 이상 20자 이하여야 합니다.');
            } else {
                hideError('passwordInput', 'passwordError');
            }
            if (isLoginPage) updateLoginButtonState();
        });
        passwordInput.addEventListener('input', function() {
            hideError('passwordInput', 'passwordError');
            if (isLoginPage) updateLoginButtonState();
        });
    }

    if (!isLoginPage && nicknameInput) {    //Sign-up form use only
        nicknameInput.addEventListener('blur', function() {
            const nickname = this.value.trim();
            if (!nickname) {
                showError('nickname', 'nicknameError', '닉네임을 입력해주세요.');
            } else if (nickname.length < 4) {
                showError('nickname', 'nicknameError', '닉네임은 4자 이상이어야 합니다.');
            } else {
                hideError('nickname', 'nicknameError');
            }
        });
        nicknameInput.addEventListener('input', function() {
            hideError('nickname', 'nicknameError');
        });
    }

    if (!isLoginPage && passwordConfirmInput) {
        passwordConfirmInput.addEventListener('blur', function() {
            const password = document.getElementById('passwordInput')?.value || '';
            const confirm = this.value || '';
            if (!confirm) {
                showError('passwordInput2', 'passwordConfirmError', '비밀번호 확인을 입력해주세요.');
            } else if (password !== confirm) {
                showError('passwordInput2', 'passwordConfirmError', '비밀번호가 일치하지 않습니다.');
            } else {
                hideError('passwordInput2', 'passwordConfirmError');
            }
        });
        passwordConfirmInput.addEventListener('input', function() {
            hideError('passwordInput2', 'passwordConfirmError');
        });
    }

    if (passwordToggle) {
        // Desktop events
        passwordToggle.addEventListener('mousedown', function() {
            showPassword('passwordInput', 'passwordToggle');
        });
        passwordToggle.addEventListener('mouseup', function() {
            hidePassword('passwordInput', 'passwordToggle');
        });
        passwordToggle.addEventListener('mouseleave', function() {
            hidePassword('passwordInput', 'passwordToggle');
        });
        
        // Mobile touch events
        passwordToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            showPassword('passwordInput', 'passwordToggle');
        });
        passwordToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            hidePassword('passwordInput', 'passwordToggle');
        });
        passwordToggle.addEventListener('touchcancel', function(e) {
            e.preventDefault();
            hidePassword('passwordInput', 'passwordToggle');
        });
    }

    if (passwordConfirmToggle) {
        // Desktop events
        passwordConfirmToggle.addEventListener('mousedown', function() {
            showPassword('passwordInput2', 'passwordConfirmToggle');
        });
        passwordConfirmToggle.addEventListener('mouseup', function() {
            hidePassword('passwordInput2', 'passwordConfirmToggle');
        });
        passwordConfirmToggle.addEventListener('mouseleave', function() {
            hidePassword('passwordInput2', 'passwordConfirmToggle');
        });
        
        // Mobile touch events
        passwordConfirmToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            showPassword('passwordInput2', 'passwordConfirmToggle');
        });
        passwordConfirmToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            hidePassword('passwordInput2', 'passwordConfirmToggle');
        });
        passwordConfirmToggle.addEventListener('touchcancel', function(e) {
            e.preventDefault();
            hidePassword('passwordInput2', 'passwordConfirmToggle');
        });
    }

    // Modal event listeners
    const modal = document.getElementById('errorModal');
    const modalOk = document.getElementById('modalOk');
    
    if (modalOk) {
        modalOk.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});
