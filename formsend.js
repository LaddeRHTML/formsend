let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failrule: 'Упс, что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    formlow = document.querySelector('form'),  
    input = form.getElementsByTagName('input'), /* берем инпуты которые находятся внутри form */
    inputlow = formlow.getElementsByTagName('input'),
    statusMessage = document.createElement('div'); /* создание оповестительного блока на странице */

    statusMessage.classList.add('status');
    /* formlow = form; */
form.addEventListener('submit', function(event) { /* вешаем обработчки события на САМУ форму, а не на кнопку  */
    event.preventDefault(); /* отменяем перезагрузку страницы во время отправки */
    form.appendChild(statusMessage); /* добавляем div при помощи appendChild */
/*    */  

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form); /* достаем все данные из заданной выше формы (у всех тех, у кого есть атрибут name )  */
    let obj = {}; /*новый обхект, куда поместим все данные  */
    formData.forEach(function(value, key) { /* делаем это для того, чтобы заполнить объект данными из formData(данными полученными от пользователя) */
        obj[key] = value;
    });
    let json = JSON.stringify(obj); /* превращаем в json формат при помощи метода stringify */

    request.send(json);

    request.addEventListener('readystatechange', function() { /* вешаем обработчик события на XML запрос чтобы наблюдать за состоянием его изменений */
        if (request.readyState < 4) {/* условие в котором если статус будет меньше четырех (readyState), то мы будем что то делать */
            statusMessage.innerHTML = message.loading; /* будет показываться блок с сообщением о загрузке */
        } else if(request.readyState === 4 && request.status === 200) { /* если все выполнено успешно и статус будет равен 4 а, так же статус запроса будет 200, то мы делаем следующее */
            statusMessage.innerHTML = message.success; /* покажет блок, в котором будет написано, спасибо мы сскоро с вами свяжемся */
        } else {
            statusMessage.innerHTML = message.failrule; /* показывает блок с ошибкой */
        }
    });
    
    for (let i = 0; i < input.length; i++) {
        input[i].value = ''; /* цикл, который берет все input'ы в форме и очищает их после того как все сработало */
    }
});