
function submitForm() {
    
    let form = document.getElementById('form');
    let inputs = document.querySelectorAll('._req');
    let isValid = true;

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
            return;
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