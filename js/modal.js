var link = document.querySelector(".comment-btn"),
    popup = document.querySelector(".modal-feedback"),
    close = popup.querySelector(".modal-content-close"),
    lining = popup.querySelector(".lining"),
    form = popup.querySelector("form"),
    yourName = popup.querySelector("[name=name]"),
    yourEmail = popup.querySelector("[name=email]"),
    yourComment = popup.querySelector("[name=comment]"),
    storageName = localStorage.getItem("yourName"),
    srorageEmail = localStorage.getItem("yourEmail"),
    label = document.querySelectorAll(".hidden-signature"),
    input = document.querySelectorAll("[placeholder]");

// Функция сброса классов (для закрытия модального окна)
var exit = function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
  form.classList.remove("modal-content-bounce");
  form.classList.remove("modal-error");
};

// Открытие модального окна и действия в нём и с ним
link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-content-show");
  form.classList.add("modal-content-bounce");

  if (storageName && srorageEmail) {
    yourName.value = storageName;
    yourEmail.value = srorageEmail;
    yourComment.focus();

    // взамен закомментированному коду, почему-то не рабочему
  } else {
    yourName.focus();
  }

  // } else {
  //   if (storageName) {
  //     yourName.value = storageName;
  //     yourEmail.focus();
  //   } else {
  //     if (storageEmail) {
  //       yourEmail.value = storageEmail;
  //       yourName.focus();
  //     }
  //   }
  // };

  // Дрожание модального окна при попытке отправки незаполненной формы
  form.addEventListener("submit", function(event) {
    if (!yourName.value || !yourEmail.value || !yourComment.value) {
      event.preventDefault();
      form.classList.remove("modal-error");
      form.offsetWidth = form.offsetWidth;
      form.classList.add("modal-error");
    } else {
      localStorage.setItem("yourName", yourName.value);
      localStorage.setItem("yourEmail", yourEmail.value);
    }
  });

  // Закрытие модального окна по клику вне его и по крестику
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("modal-content-show")) {
        exit(event);
      }
    }
  });
  lining.addEventListener("click", exit, true);
  close.addEventListener("click", exit, true);
});

// Управление лейблами, плейсхолдерами, и реквайедами
for (i = 0; i < label.length; i++) {
  if (input[i].hasAttribute("required")) {
    input[i].removeAttribute("required");
  };
  if (input[i].hasAttribute("placeholder")) {
    input[i].removeAttribute("placeholder");
    label[i].classList.add("signature");
  };
  if (input[i].value) {
    label[i].classList.add("focus-signature");
  };

  input[i].addEventListener("focus", function(event){
    var idFor = event.target.getAttribute("id");
    for (var i = 0; i < label.length; i++) {
      if (label[i].getAttribute("for") === idFor) {
        label[i].classList.add("focus-signature");
        input[i].addEventListener("blur", function(event) {
          var labelBlur = document.querySelector(".focus-signature");
          if (!this.value) {
            labelBlur.classList.remove("focus-signature");
          };
        })
      }
    }
  })
};
