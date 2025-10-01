document.querySelectorAll('.toggle-password').forEach((icon) => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const input = document.getElementById(targetId);
  
      if (input.type === 'password') {
        input.type = 'text';
        icon.src = './image/ic_eye_on.svg';
      } else {
        input.type = 'password';
        icon.src = './image/ic_eye_off.svg';
      }
    });
  });
  