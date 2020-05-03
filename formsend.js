/// form

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failrule: 'Упс, что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    formlow = document.querySelector('form'),  
    input = form.getElementsByTagName('input'), /* берем инпуты которые находятся внутри form */
    statusMessage = document.createElement('div'); /* создание оповестительного блока на странице */
    statusMessage.classList.add('status');
    /* formlow = form; */
    
function sendForm(elem) {
    elem.addEventListener('submit', function(event) {
        event.preventDefault(); /* отменяем перезагрузку страницы во время отправки */
        elem.appendChild(statusMessage); /* добавляем div при помощи appendChild */ /* вешаем обработчки события на САМУ форму, а не на кнопку  */
        let formData = new FormData(elem);
        function setData(data) {
            return new Promise(function(resolve, reject) {
                
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.onreadystatechange = function() { /* вешаем обработчик события на XML запрос чтобы наблюдать за состоянием его изменений */
                if (request.readyState < 4) {/* условие в котором если статус будет меньше четырех (readyState), то мы будем что то делать */
                    resolve(); /* будет показываться блок с сообщением о загрузке */
                } else if(request.readyState === 4) {
                    if (request.status == 200 && request.status < 3)  { /* если все выполнено успешно и статус будет равен 4 а, так же статус запроса будет 200, то мы делаем следующее */
                        resolve(); /* покажет блок, в котором будет написано, спасибо мы сскоро с вами свяжемся */
                    } 
                    else {
                        reject();
                        /* показывает блок с ошибкой */
                    }
                }
            };
            request.send(data);
            
        });
    }  
    function clearInput() {
        for (let i = 0; i < input.length; i++) {
            input[i].value = ''; /* цикл, который берет все input'ы в форме и очищает их после того как все сработало */
        }
    }
    setData(formData)
    .then(() => statusMessage.innerHTML = message.loading)
    .then(() => { 
        thanksModal.style.display = 'block';
        mainModal.style.display = 'block';
        statusMessage.innerHTML = '';
    })
    .catch(() => statusMessage.innerHTML = message.failrule)
    .then(clearInput);
});
}
sendForm(form);
sendForm(formlow);