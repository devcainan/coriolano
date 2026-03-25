/* ============================================================
   FORM.JS — Validação do formulário de contato
   Guimarães & Coriolano Advocacia
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');

  /* ===================================================
     REGRAS DE VALIDAÇÃO
     =================================================== */
  const rules = {
    name: {
      validate: (v) => v.trim().length >= 3,
      message: 'Por favor, informe seu nome completo (mínimo 3 caracteres).'
    },
    phone: {
      validate: (v) => /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(v.trim().replace(/\s/g, '')),
      message: 'Informe um telefone válido com DDD. Ex: (84) 99999-9999'
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Informe um e-mail válido.'
    },
    area: {
      validate: (v) => v !== '',
      message: 'Selecione a área de interesse.'
    },
    message: {
      validate: (v) => v.trim().length >= 10,
      message: 'Por favor, descreva seu caso (mínimo 10 caracteres).'
    }
  };

  /* ===================================================
     HELPERS
     =================================================== */
  function getField(name) {
    return form.querySelector(`[name="${name}"]`);
  }

  function getError(name) {
    return form.querySelector(`[data-error="${name}"]`);
  }

  function setValid(field, errorEl) {
    field.classList.remove('error');
    field.classList.add('valid');
    errorEl.textContent = '';
  }

  function setInvalid(field, errorEl, message) {
    field.classList.add('error');
    field.classList.remove('valid');
    errorEl.textContent = message;
  }

  function validateField(name) {
    const field = getField(name);
    const errorEl = getError(name);
    if (!field || !errorEl) return true;

    const rule = rules[name];
    if (!rule) return true;

    if (rule.validate(field.value)) {
      setValid(field, errorEl);
      return true;
    } else {
      setInvalid(field, errorEl, rule.message);
      return false;
    }
  }

  /* ===================================================
     VALIDAÇÃO EM TEMPO REAL (blur)
     =================================================== */
  Object.keys(rules).forEach(name => {
    const field = getField(name);
    if (field) {
      field.addEventListener('blur', () => validateField(name));
      field.addEventListener('input', () => {
        // Limpa erro ao digitar se o campo estava inválido
        if (field.classList.contains('error')) {
          validateField(name);
        }
      });
    }
  });

  /* ===================================================
     SUBMIT
     =================================================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(rules).forEach(name => {
      if (!validateField(name)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Simula envio e mostra mensagem de sucesso
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('visible');
        }
      }, 800);
    } else {
      // Rola para o primeiro campo com erro
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });

});
