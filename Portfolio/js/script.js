
function submitForm() {
    
    let form = document.getElementById('form');

    let nameInput = document.getElementById('input_name');
    let emailInput = document.getElementById('input_email');
    let textInput = document.getElementById('input_text');
    let textArea = document.getElementById('textarea');

    // if(!/\S+/.test(nameInput.value) ||
    //    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value) ||
    //    !/\S+/.test(textInput.value) ||
    //    !/\S+/.test(textArea.value)) {
    //     alert("Заполните все поля формы");
    //     return;
    //    }

       if(!/\S+/.test(nameInput.value)) {
        nameInput.classList.add('_error');
        return
       }



    //Отправка формы через Formspare
     let xhr = new XMLHttpRequest();
     xhr.open(form.method, form.action);
     xhr.setRequestHeader("Accept", "application/json");
     xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            form.submit();
            form.reset();
        } else {
            console.error('Произошла ошибка');
        }
     }
     xhr.send( new FormData(form));
}