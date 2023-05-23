
function submitForm() {
    
    let form = document.getElementById('form');

    let inputs = document.querySelectorAll('._req');

    let nameInput = document.getElementById('input_name');
    let emailInput = document.getElementById('input_email');
    let textInput = document.getElementById('input_text');
    let textArea = document.getElementById('textarea');

    let isValid = true;

    // if(!/\S+/.test(nameInput.value) ||
    //    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value) ||
    //    !/\S+/.test(textInput.value) ||
    //    !/\S+/.test(textArea.value)) {
    //     alert("Заполните все поля формы");
    //     return;
    //    }



    for( let i=0; i<inputs.length; i++) {
        let input= inputs[i];

        if( input.type === "text" && !/\S+/.test(input.value) ||
            input.type === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value) ||
            input.type === "textarea" && !/\S+/.test(input.value)) {
                input.classList.add('_error');
                isValid = false;

            } else {
                input.classList.remove('_error');
            }
    }

    if (!isValid) {
            alert("Заполните поля");
            return;
           }



    //    if(!/\S+/.test(nameInput.value)) {
    //     nameInput.classList.add('_error');
    //     isValid = false;
    //    } else {
    //     nameInput.classList.remove('_error');
    //    }

    //    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
    //     nameInput.classList.add('_error');
    //     isValid = false;
    //    } else {
    //     nameInput.classList.remove('_error');
    //    }

    //    if(!/\S+/.test(textInput.value)) {
    //     nameInput.classList.add('_error');
    //     isValid = false;
    //    } else {
    //     nameInput.classList.remove('_error');
    //    }

    //    if(!/\S+/.test(textArea.value)) {
    //     nameInput.classList.add('_error');
    //     isValid = false;
    //    } else {
    //     nameInput.classList.remove('_error');
    //    }

    //    if (!isValid) {
    //     alert("Заполните поля");
    //     return;
    //    }



    // function validate() {

    //     let formReq= document.querySelectorAll('._req');

    //     for( let i=0; i<formReq.length; i++) {
    //         const input= formReq[i];
    //         input.classList.remove('_error');
    
    //         if (input.value === "") {
    //             input.classList.add('_error');
    //         }
    //     }
    //     return;
    // }

    // validate();
    



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