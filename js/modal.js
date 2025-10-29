export function createModal() {
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal__header"><h3 id="modal-title">알림</h3></div>
          <div class="modal__body" id="modal-body"></div>
          <div class="modal__footer">
            <button class="modal__btn" data-role="cancel">취소</button>
            <button class="modal__btn modal__btn--primary" data-role="ok">확인</button>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
    }
    const titleEl = backdrop.querySelector('#modal-title');
    const bodyEl  = backdrop.querySelector('#modal-body');
    const okBtn   = backdrop.querySelector('[data-role="ok"]');
    const cancelBtn = backdrop.querySelector('[data-role="cancel"]');
  
    function open({ title='알림', message='', okText='확인', cancelText='취소', onOk=null, onCancel=null, showCancel=false }) {
      titleEl.textContent = title;
      bodyEl.innerHTML = message;
      okBtn.textContent = okText;
      cancelBtn.textContent = cancelText;
      cancelBtn.style.display = showCancel ? '' : 'none';
      backdrop.classList.add('show');
      const close = () => backdrop.classList.remove('show');
      okBtn.onclick = () => { close(); onOk && onOk(); };
      cancelBtn.onclick = () => { close(); onCancel && onCancel(); };
      backdrop.onclick = (e) => { if (e.target === backdrop) close(); };
    }
    return { open };
  }
  