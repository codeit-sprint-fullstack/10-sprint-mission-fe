
// 패스워드 감추기 보기


function togglePassword(btn) {
            // 버튼과 가장 가까운 input을 찾음
            const wrapper = btn.closest(".password_hid_wrap");
            const input = wrapper.querySelector("input");

            if (input.type === "password") {
                input.type = "text";
                btn.classList.add("on");
            } else {
                input.type = "password";
                btn.classList.remove("on");
            }
        }

// 패스워드 감추기 보기 끝



    // 이메일 입력칸 유효성 검사 


    const login_id = document.querySelector('#panda_email01');
    const emailMessage = document.querySelector('#email-message');


    login_id.addEventListener('change', () => {
      validateEmail() // 인풋에 유효성검사를 통해 안내메세지를 출력
      login_btn_disabled() // 인풋에 정상적인 내용이 나오면 버튼을 활성화
    } )

    
function validateEmail() {
  const email = login_id.value.trim(); // 공백 제거
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규식
     


  if (email === '') {
    emailMessage.textContent = '이메일을 입력해주세요.';
    emailMessage.style.color = 'red';
    login_id.classList.add('error');    
  } else if (!emailRegex.test(email)) {
    emailMessage.textContent = '이메일 형식이 올바르지 않습니다.';
    emailMessage.style.color = 'red';
    login_id.classList.add('error');   
  } else {
    emailMessage.textContent = '올바른 이메일 형식입니다.';
    emailMessage.style.color = 'green';
    login_id.classList.remove('error')
    
  }


}

      // 비빌번호 입력칸 유효성 검사 
    const login_pw = document.querySelector('#panda_pw');

    const pwMessage = document.querySelector('#pw-message');
    login_pw.addEventListener('change', ()=>{
       validatePw()

       validate_re_Pw_check()
       
       login_btn_disabled()
       
    }  )

    
    
  
function validatePw() {
  const pw = login_pw.value.trim(); // 공백 제거
  const pwRegex = login_pw.value.length; // 이메일 형식 정규식
    




  if (pw === '') {
    pwMessage.textContent = '비밀번호를 입력해주세요.';
    pwMessage.style.color = 'red';
    login_pw.classList.add('error');    
  } else if (pwRegex < 8) {
    pwMessage.textContent = '비밀번호를 8자 이상 입력해주세요.';
    pwMessage.style.color = 'red';
    login_pw.classList.add('error');   
  } else {
    pwMessage.textContent = '';
    login_pw.classList.remove('error')

  }
}
  
      // 비빌번호 확인 입력칸 유효성 검사 
    const login_re_pw = document.querySelector('#re_panda_pw');

    const re_pwMessage = document.querySelector('#re_pw-message');
    login_re_pw.addEventListener('change', ()=>{
       validate_re_Pw()
       validate_re_Pw_check()
       login_btn_disabled()
       
    }  )

    
    
  
function validate_re_Pw() {
  const re_pw = login_re_pw.value.trim(); // 공백 제거
  const re_pwRegex = login_re_pw.value.length; // 이메일 형식 정규식
    




  if (re_pw === '') {
    re_pwMessage.textContent = '비밀번호를 입력해주세요.';
    re_pwMessage.style.color = 'red';
    login_re_pw.classList.add('error');    
  } else if (re_pwRegex < 8) {
    re_pwMessage.textContent = '비밀번호를 8자 이상 입력해주세요.';
    re_pwMessage.style.color = 'red';
    login_re_pw.classList.add('error');   
  } else {
    re_pwMessage.textContent = '';
    login_re_pw.classList.remove('error')

  }
}

function validate_re_Pw_check() {
    const Pw_input_check = login_pw.value
    const re_Pw_input_check = login_re_pw.value

    if(Pw_input_check == re_Pw_input_check) {
        re_pwMessage.textContent = '';
    login_re_pw.classList.remove('error')

    } else{
          re_pwMessage.textContent = '비밀번호가 일치하지 않습니다.';
    re_pwMessage.style.color = 'red';
    login_re_pw.classList.add('error');   
    }
   
    console.log(Pw_input_check)
    console.log(re_Pw_input_check)

}
  

    

// 버튼에 활성화를 결정해주는 함수

    function login_btn_disabled(){
 const panda_btn_login = document.querySelectorAll('.panda_btn_login')

const isValid = !login_pw.classList.contains('error') && !login_id.classList.contains('error') && !login_re_pw.classList.contains('error') && login_pw.value !== "" &&  login_id.value !== "" &&  login_re_pw.value !== "";
      if(isValid){
        panda_btn_login.forEach(btn => {
  btn.disabled = false; // 활성화
});
      } else{
        panda_btn_login.forEach(btn => {
  btn.disabled = true; // 비활성화
});
      }
    }




// 유저 정보 

const USER_DATA = [
           { email: 'codeit1@codeit.com', password: "codeit101!" },
	           { email: 'codeit2@codeit.com', password: "codeit202!" },
           	{ email: 'codeit3@codeit.com', password: "codeit303!" },
	           { email: 'codeit4@codeit.com', password: "codeit404!" },
	           { email: 'codeit5@codeit.com', password: "codeit505!" },
	           { email: 'codeit6@codeit.com', password: "codeit606!" },
]

const panda_btn_login_click_event = document.querySelector('#panda_btn_login_02')

  
function findEmail(e) {
  e.preventDefault();
  const login_id_Value = login_id.value;

  // 여기에 코드를 작성하세요
  const user_id = USER_DATA.find((el) =>  login_id_Value === el.email)
  if(user_id){
   
alert("사용 중인 이메일입니다");
  }
  else{
   window.location.href = '../html/items.html'
 }
 
  
}


panda_btn_login_click_event.addEventListener('submit', findEmail);




