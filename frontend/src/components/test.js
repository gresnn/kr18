import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Test {

    constructor() {
        this.progressBarElement = null;
        this.passButtonsElement = null;
        this.prevButtonsElement = null;
        this.nextButtonsElement = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.quiz = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.arrowGrey = false;
        this.routeParams = UrlManager.getQueryParams();

        this.init();
        //     UrlManager.checkUserdata(this.routeParams);
      //  checkUserdata();
        console.log(sessionStorage);
       // const url = new URL(location.href);
      //  const testId = this.routeParams.id;


    }
   async  init() {
        if (this.routeParams.id) {

            try {
                const result = await CustomHttp.request(config.host + '/tests/' +this.routeParams.id);
                console.log('result  '  + result);
    //            alert('result  '  + result);
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    //  location.href = '#/choice';

                    this.quiz = result;
                    this.startQuiz();
                }
                // else {
                //     location.href = '#/';
                // }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }
            // const xhr = new XMLHttpRequest();
            // xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + this.routeParams.id, false);
            // xhr.send();
        //     if (xhr.status === 200 && xhr.responseText) {
        //         // try {
        //         //     this.quiz = JSON.parse(xhr.responseText);
        //         // } catch (e) {
        //         //     location.href = '#/';
        //         // }
        //         this.startQuiz();
        //     } else {
        //         location.href = '#/';
        //     }
        // } else {
        //     location.href = '#/';
        // }
    }

    startQuiz() {
        console.log(this.quiz);
        this.progressBarElement = document.getElementById('progress-bar');
        this.questionTitleElement = document.getElementById('title');
        this.optionsElement = document.getElementById('options');
        this.nextButtonsElement = document.getElementById('next');
        this.nextButtonsElement.onclick = this.move.bind(this, 'next');
        this.passButtonsElement = document.getElementById('pass');
        this.passDivElement = document.getElementById('pass-div');
        this.passButtonsElement.onclick = this.move.bind(this, 'pass');
        document.getElementById('pre-title').innerText = this.quiz.name;
        //  sessionStorage.setItem('cart2', JSON.stringify(this.quiz.name));

        this.prevButtonsElement = document.getElementById('prev');
        this.prevButtonsElement.onclick = this.move.bind(this, 'prev');

        this.prepareProgressBar();
        this.showQuestion();

        const timerElement = document.getElementById('timer');
        let seconds = 60;
        this.interval = setInterval(function () {
            seconds--;
            timerElement.innerText = seconds;
            if (seconds === 0) {
                clearInterval(this.interval);
                this.complete();
            }
        }.bind(this), 1000);
    }

    prepareProgressBar() {
        for (let i = 0; i < this.quiz.questions.length; i++) {
            const itemElement = document.createElement('div');
            itemElement.className = 'test-progress-bar-item ' + (i === 0 ? 'active' : '');

            const itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test-progress-bar-item-circle';

            const itemTextElement = document.createElement('div');
            itemTextElement.className = 'test-progress-bar-item-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);

            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);

            this.progressBarElement.appendChild(itemElement);

        }
    }

    showQuestion() {

        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        // console.log(activeQuestion);
        this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
            + ':</span> ' + activeQuestion.question;

        this.optionsElement.innerHTML = '';
        const that = this;
        const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
        activeQuestion.answers.forEach(answer => {
            const optionElement = document.createElement('div');
            optionElement.className = 'test-question-option';

            const inputId = 'answer-' + answer.id;
            const inputElement = document.createElement('input');
            inputElement.className = 'option-answer';
            inputElement.setAttribute('id', inputId);
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id);

            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
                this.passButtonsElement.innerHTML = 'Пропустить вопрос <img src="/images/grey-arrow.png" id="grey-arrow" alt="Стрелка далее">';
                this.passButtonsElement.classList.add('stop-link');
                this.passDivElement.classList.add('stop-link');
            }

            inputElement.onchange = function () {

                that.chooseAnswer();

            }

            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', inputId);
            labelElement.innerText = answer.answer;

            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);

            this.optionsElement.appendChild(optionElement);
        });
        if (chosenOption && chosenOption.chosenAnswerId) {
            this.nextButtonsElement.removeAttribute('disabled');

        } else {
            this.nextButtonsElement.setAttribute('disabled', 'disabled');
        }

        if (this.currentQuestionIndex === this.quiz.questions.length) {
            this.nextButtonsElement.innerText = 'Завершить';
        } else {
            this.nextButtonsElement.innerText = 'Дальше';
        }
        if (this.currentQuestionIndex > 1) {
            this.prevButtonsElement.removeAttribute('disabled');

        } else {
            this.prevButtonsElement.setAttribute('disabled', 'disabled');
        }

    }

    chooseAnswer() {
        //console.log(arrowGrey);
        this.nextButtonsElement.removeAttribute('disabled');
        this.passButtonsElement.classList.add('stop-link');
        this.passDivElement.classList.add('stop-link');
        this.passButtonsElement.innerHTML = 'Пропустить вопрос <img src="/images/grey-arrow.png" id="grey-arrow" alt="Стрелка далее">';
        this.arrowGrey = true;
        console.log(this.arrowGrey);
    }

    move(action) {
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
            return element.checked;
        });
        let chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
            this.passButtonsElement.innerHTML = 'Пропустить вопрос <img src="/images/grey-arrow.png" id="grey-arrow" alt="Стрелка далее">';
        }

        const existingResult = this.userResult.find(item => {
            return item.questionId === activeQuestion.id;
        });
        if (existingResult) {
            existingResult.chosenAnswerId = chosenAnswerId;
        } else {
            this.userResult.push({
                questionId: activeQuestion.id,
                chosenAnswerId: chosenAnswerId
            })
        }

        console.log(this.userResult);
        console.log(this.arrowGrey);
        if (action === 'next' || action === 'pass') {
            this.currentQuestionIndex++;
            this.passButtonsElement.classList.remove('stop-link');
            this.passDivElement.classList.remove('stop-link');
            this.passButtonsElement.innerHTML = 'Пропустить вопрос <img src="/images/small-arrow.png" id="grey-arrow" alt="Стрелка далее">';
        } else {
            this.currentQuestionIndex--;
            this.passButtonsElement.classList.remove('stop-link');
            this.passDivElement.classList.remove('stop-link');
            this.passButtonsElement.innerHTML = 'Пропустить вопрос <img src="/images/small-arrow.png" id="grey-arrow" alt="Стрелка далее">';

        }

        if (this.currentQuestionIndex > this.quiz.questions.length) {
            this.prevButtonsElement.setAttribute('disabled', 'disabled');
            this.nextButtonsElement.setAttribute('disabled', 'disabled');
            this.passButtonsElement.innerHTML = 'Пропустить вопрос';
            this.passButtonsElement.classList.add('stop-link');
            this.passDivElement.classList.add('stop-link');
            // Пропустить вопрос
            clearInterval(this.interval);
            this.complete();
            return;
        }

        Array.from(this.progressBarElement.children).forEach((item, index) => {
            const currentItemIndex = index + 1;
            item.classList.remove('complete');
            item.classList.remove('active');

            if (currentItemIndex === this.currentQuestionIndex) {
                item.classList.add('active');
            } else if (currentItemIndex < this.currentQuestionIndex) {
                item.classList.add('complete');
            }
        })

        this.showQuestion();
    }

    async complete() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/'
        }

        try {
            const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                userId: userInfo.userId,
                results: this.userResult
            });
            console.log(userInfo.userId);
       //     alert(userInfo.userId);
            console.log(this.userResult);
     //       alert(this.userResult);
            console.log(result);
    //        alert(result);
            console.log(this.routeParams.id);
 //           alert(this.routeParams.id);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                location.href = '#/result?id=' + this.routeParams.id;
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }

        // const url = new URL(location.href);
        // const id = url.searchParams.get('id');
        // const name = url.searchParams.get('name');
        // const lastName = url.searchParams.get('lastName');
        // const email = url.searchParams.get('email');

        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'https://testologia.ru/pass-quiz?id=' + this.routeParams.id, false);
        // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        // xhr.send(JSON.stringify({
        //     name: this.routeParams.name,
        //     lastName: this.routeParams.lastName,
        //     email: this.routeParams.email,
        //     results: this.userResult
        // }));

        // if (xhr.status === 200 && xhr.responseText) {
       //      let result = null;
        //     try {
        //         result = JSON.parse(xhr.responseText);
        //     } catch (e) {
        //         location.href = '#/';
        //     }
        //     if (result) {
        //         console.log(result);
        //         console.log(this.userResult);
        //         location.href = '#/result?score=' + result.score + '&total=' + result.total;
        //         sessionStorage.setItem('cartUserResult', JSON.stringify(this.userResult));
       //          sessionStorage.setItem('result-score', JSON.stringify(result.score + '/' + result.total));
        //     }
        // } else {
        //     location.href = '#/';
        // }

    }
}
