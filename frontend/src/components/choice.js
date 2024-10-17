import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth";

export class Choice {

    constructor() {
        this.quizzes = [];
        this.routeParams = UrlManager.getQueryParams();
        this.testResults = false;
        // UrlManager.checkUserdata(this.routeParams);
        this.init();
    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/tests');

            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
              //  location.href = '#/choice';

                this.quizzes = result;
             //   this.progressQuizzes();
            }
            // else {
            //     location.href = '#/';
            // }
        } catch (error) {
            alert(error);
            return console.log(error);

        }
        const userInfo = Auth.getUserInfo();
        if (userInfo) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/results?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    //  location.href = '#/choice';

                    this.testResults = result;
                  //  this.progressQuizzes();
                }
                // else {
                //     location.href = '#/';
                // }
            } catch (error) {
                alert(error);
                return console.log(error);

            }


              //  this.testResults = await CustomHttp.request(config.host + '/tests/result?userId=' + userInfo.userId);

        }

        this.progressQuizzes();

       // console.log('this.testResults:  ' + this.testResults);
        console.log(userInfo);
      //  alert('this.testResults   ' + this.testResults);
 //       alert('userInfo   ' + userInfo.userId);
  //      alert('usernameInfo   ' + userInfo.fullName);

        console.log(sessionStorage);
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', 'https://testologia.ru/get-quizzes', false);
        // xhr.send();

        // if (xhr.status === 200 && xhr.responseText) {
        //     try {
        //         this.quizzes = JSON.parse(xhr.responseText);
        //     } catch (e) {
        //         console.log('ERROR try-catch');
        //         alert('ERROR try-catch');
        //         location.href = '#/';
        //     }
        //     this.progressQuizzes();
        // } else {
        //     console.log('ERROR !200');
        //     alert('ERROR !200');
        //     location.href = '#/';
        // }
    }
    progressQuizzes() {
        console.log(this.quizzes);
        const choiceOptionsElement = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0) {
            this.quizzes.forEach(quiz => {
                const that = this;
              //  console.log(quiz);
                const choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id);
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                }

                const choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice-option-arrow';

                const result = this.testResults.find(item => item.testId === quiz.id);
                if (result) {
                    const choiceOptionResultElement = document.createElement('div');
                    choiceOptionResultElement.className = 'choice-option-result';
                    choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                    choiceOptionElement.appendChild(choiceOptionResultElement);
                }

                const choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', 'images/icon-arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Стрелка')

                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);

                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    }

    chooseQuiz(element) {
        //   console.log(location.search);
        console.log(element);
        console.log(element.getAttribute('data-id'));
        const dataId = element.getAttribute('data-id');
        if (dataId) {
          //  location.href = '#/test?name=' + this.routeParams.name + '&lastName=' + this.routeParams.lastName + '&email=' + this.routeParams.email + '&id=' + dataId;
            location.href = '#/test?id=' + dataId;
           // sessionStorage.setItem('testId', JSON.stringify(dataId));
        }
    }
}