var link = document.querySelector(".comment-btn"),
    popup = document.querySelector(".modal-feedback"),
    close = popup.querySelector(".modal-content-close"),
    lining = popup.querySelector(".lining"),
    form = popup.querySelector("form"),
    yourName = popup.querySelector("[name=name]"),
    yourEmail = popup.querySelector("[name=email]"),
    yourComment = popup.querySelector("[name=comment]"),
    storageName = localStorage.getItem("yourName"),
    srorageEmail = localStorage.getItem("yourEmail");

var exit = function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
  form.classList.remove("modal-content-bounce");
  form.classList.remove("modal-error");
};

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

});


close.addEventListener("click", function(event) {
  exit(event);
});

lining.addEventListener("click", function(event) {
  exit(event);
});

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

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup.classList.contains("modal-content-show")) {
      exit(event);
    }
  }
});
