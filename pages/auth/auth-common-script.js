// input 요소 선택 (존재 여부 체크)
const email = document.getElementById('email');
email.pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
email.required = true;

const password = document.getElementById('password');
password.minLength = 8;
password.required = true;

const nickname = document.getElementById('nickname');
if (nickname) {
  nickname.required = true;
}

const passwordRetry = document.getElementById('password-retry');
if (passwordRetry) {
  passwordRetry.minLength = 8;
  passwordRetry.required = true;
}

const submit = document.getElementById('submit');
submit.disabled = true;

submit.addEventListener('click', event => {
    event.preventDefault();

    if (submit.disabled) {
        return;
    }

    if (!nickname) {
        window.location.href = "/pages/items.html";
        return;
    }
    
})

// 🔸 validationMessages
const validationMessages = {
  email: {
    valueMissing: '이메일을 입력해주세요.',
    typeMismatch: '잘못된 이메일 형식입니다.',
  },
  password: {
    valueMissing: '비밀번호를 입력해주세요.',
    tooShort: '비밀번호는 최소 8자 이상이어야 합니다.',
  },
  nickname: {
    valueMissing: '닉네임을 입력해주세요.',
  },
  'password-retry': {
    valueMissing: '비밀번호 확인을 입력해주세요.',
    customError: '비밀번호가 일치하지 않습니다.',
  }
};

// 🔸 에러 메시지 제거
const removeMessage = target => {
  if (!target?.parentNode) return;
  const existingMsg = target.parentNode.querySelector('.error-message');
  if (existingMsg) existingMsg.remove();
};

// 🔸 에러 메시지 추가
const addMessageContent = (target, message) => {
  if (!target?.parentNode) return;
  removeMessage(target);

  const p = document.createElement('p');
  p.textContent = message;
  p.className = 'error-message';
  target.parentNode.appendChild(p);
};

// 🔸 비밀번호 일치 체크 (password-retry)
const checkPasswordMatch = () => {
  if (password && passwordRetry) {
    if (passwordRetry.value && passwordRetry.value !== password.value) {
      passwordRetry.setCustomValidity('비밀번호가 일치하지 않습니다.');
    } else {
      passwordRetry.setCustomValidity('');
    }
  }
};

const checkSubmitStatus = () => {
    
    const inputs = [email, password, nickname, passwordRetry];
// 존재하는 input만 필터링
    const status = inputs
    .filter(input => input)          // null/undefined 제거
    .every(input => input.validity.valid);
    submit.disabled = !status;
}

// 🔸 유효성 검사 및 메시지 처리
const checkValidation = event => {
  const input = event.target;
  if (!input) return;

  const messages = validationMessages[input.id];

  // password-retry 일치 여부 먼저 체크
  if (input.id === 'password-retry') checkPasswordMatch();

  removeMessage(input);

  if (!input.validity.valid) {
    input.classList.add('invalid');

    // validity 속성 순회하면서 메시지 출력
    for (const key in input.validity) {
      if (input.validity[key] && messages?.[key]) {
        addMessageContent(input, messages[key]);
        break; // 첫 번째 오류만 표시
      }
    }
  } else {
    input.classList.remove('invalid');
  }
  checkSubmitStatus();
};

// 🔸 이벤트 등록
[email, password, nickname, passwordRetry].forEach(el => {
  if (el) el.addEventListener('focusout', checkValidation);
});
const showToggle = document.getElementsByClassName('show-toggle');

const toggleButton = event => {
    const img = event.target;
    const input = img.previousElementSibling;

    img.classList.toggle('off');
    
    if (img.classList.contains('off')) {
        img.src = "./images/show.png";
        input.type = "text";
    }
    else {
        img.src = "./images/btn-visibility.png";
        input.type = "password";
    }
}

for (let button of showToggle) {
    button.addEventListener('click', toggleButton)
}