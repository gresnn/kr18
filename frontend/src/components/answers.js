import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {UrlManager} from "../utils/url-manager.js";

export class Answers {
    constructor() {


        this.userTestElement = null;
        this.quizAnswers = null;
        this.quizQuestions = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.quiz = null;
        this.currentQuestionIndex = 1;
        this.currentAnswerIndex = 1;
        this.correct = true;
        const userName = JSON.parse(localStorage.getItem('userInfo'));
        this.optionsElement = document.getElementById('options-all');
        const phrase1 = userName.fullName;
        const phrase2 = userName.userEmail;
        console.log(phrase1);
        console.log(phrase2);
        document.getElementById('author').innerHTML = '<span>Тест выполнил </span>' + phrase1 + ', ' + phrase2;
    //    const testId = JSON.parse(sessionStorage.getItem('testId'));
        this.routeParams = UrlManager.getQueryParams();

        this.init();
    }
       ////////////////////////////////

        async init() {
            const userInfo = Auth.getUserInfo();
            document.getElementById ('pass-question-results').innerHTML = '<a href="#/result?id=' + this.routeParams.id + '" id="pass">Обратно к моему результату теста <img src="/images/small-arrow.png" alt="Стрелка далее"></a>';
         //   console.log('userInfo.   ' + userInfo);
        //    console.log(userInfo);
        //    alert('userInfo.   ' + userInfo);
    //        console.log('userInfo.userId   ' + userInfo.userId);
         //   alert('userInfo.userId   ' + userInfo.userId);
 //           console.log('userInfo.userId   ' + userInfo.userEmail);
        //    alert('userInfo.userId   ' + userInfo.userEmail);
      //      console.log('this.routeParams   ' + this.routeParams);
   //         console.log(this.routeParams);
   //         console.log(this.routeParams.id);
    //        alert('this.routeParams   ' + this.routeParams);
            if (!userInfo) {
                console.log('!!!!! NO userInfo.userId   ' + userInfo.userId);
                alert('!!!!! NO userInfo.userId   ' + userInfo.userId);
                location.href = '#/'
            }

            if (this.routeParams.id) {
                try {
                    const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
      //              console.log('result  ' + result);
               //     alert('result  ' + result);
                    console.log('userInfo.userId  ' + userInfo.userId);
                //    alert('userInfo.userId  ' + userInfo.userId);
                    console.log('this.routeParams.id  ' + this.routeParams.id);
               //     alert('this.routeParams.id  ' + this.routeParams.id);
                    console.log(result.test);
               //     alert('result.total  ' + result.test);
                    if (result) {
                        if (result.error) {
                            throw new Error(result.error);
                        }
///////////////////////////////
                     //   console.log(this.routeParams.score);
                     //   console.log(this.routeParams.total);
                   //     console.log(this.routeParams.id);
        //                alert('УСТЬ РЕЗАЛТ!!!');
                       // const resultArray = [];
                       // console.log(sessionStorage);
                        this.quizQuestions = result.test;
                        this.showQuestion2();
                        //  const testScore = JSON.parse(sessionStorage.getItem('result-score'));
                    //    const testScore = result.score + '/' + result.total;
                      //  console.log('testScore 1 ' + testScore);
                      //   if (testScore === "null/null") {
                      //       // const phrase = testScore.join(' ');
                      //       console.log('testScore 2 "null/null "' + testScore);
                      //       document.getElementById('result-score').innerText = '';
                      //   } else {
                      //       console.log('testScore 3 else ' + testScore);
                      //       console.log(typeof testScore);
                      //       document.getElementById('result-score').innerText = testScore;
                      //
                      //
                      //       const url = new URL(location.href);
                      //       console.log(sessionStorage);
                      //       // document.getElementById('result-score').innerText = url.searchParams.get('score') +
                      //       // '/' + url.searchParams.get('total');
                      //       console.log(document.getElementById('result-score').innerText);
                      //       sessionStorage.setItem('result-score', JSON.stringify(document.getElementById('result-score').innerText));
                      //       //location.href = 'answers.html';
                      //       console.log(sessionStorage);
                      //   }
                   //     return;

//////////////////////////////////////////
                        //   location.href = '#/result?id=' + this.routeParams.id;
                    }
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            }
       //     alert('  END   ');
            //   alert('   error  location.href = \'#/\' ');
           // location.href = '#/'
        }

       ///////////////////////////////////

        // if (testId) {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
        //     xhr.send();
        //     if (xhr.status === 200 && xhr.responseText) {
        //         try {
        //             this.quizAnswers = JSON.parse(xhr.responseText);
        //             console.log('truAnswers - this.quizAnswers', this.quizAnswers);
        //         } catch (e) {
        //            //// location.href = '#/';
        //         }
        //     } else {
        //       ////  location.href = '#/';
        //     }
        // } else {
        //   ////  location.href = '#/';
        // }
//
//         if (testId) {
//             const xhr2 = new XMLHttpRequest();
//             xhr2.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
//             xhr2.send();
//             if (xhr2.status === 200 && xhr2.responseText) {
//                 try {
//                     this.quizQuestions = JSON.parse(xhr2.responseText);
//                     this.showQuestion();
//                 } catch (e) {
//               ////      location.href = '#/';
//                 }
//             } else {
//             ////    location.href = '#/';
//             }
//         } else {
//          ////   location.href = '#/';
//         }

    showQuestion2() {

        document.getElementById('answer-pre-title2').innerText = this.quizQuestions.name;
     //   const userResult = JSON.parse(sessionStorage.getItem('cartUserResult'));
      //  console.log('userResult: - const userResult  ', userResult);
       // console.log('userResult: - const userResult chosenAnswerId: ', userResult[0].chosenAnswerId);
   //     console.log('AllQuestions - this.quizQuestions: ', this.quizQuestions);
  //      console.log('AllQuestions - this.quizQuestions: ', this.quizQuestions.questions);
  //      console.log('AllQuestions - this.quizQuestions: ', this.quizQuestions.questions[0].answers);
        let varI = 0;

        this.quizQuestions.questions.forEach(item => {
            // console.log(item);
            // console.log(item.question);
            // console.log(item.answers);
            // console.log('truAnswers - this.quizAnswers', this.quizAnswers);
            // console.log('truAnswers - this.quizAnswers []  ', this.quizAnswers[varI]);
            // console.log(varI);
            const optionElementAll = document.createElement('div');
            optionElementAll.className = 'answer-question';
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-question-title';
            const optionElementAllAnswer = document.createElement('div');
            optionElementAllAnswer.className = 'answer-question-options';
            optionElement.innerHTML = '<span>Вопрос: ' + this.currentQuestionIndex + ' </span>' + item.question;
            optionElementAll.appendChild(optionElement);
            this.currentQuestionIndex++;
        //    console.log(item.answers);
           // console.log(item.answers.correct);

            item.answers.forEach(answer => {
            //    console.log(item.answers);
         //       console.log(answer);
          //      console.log(answer.correct);
      //          console.log(answer.id);
      //           if (answer.correct === true) {
      //               console.log(answer.correct);
      //               // console.log(' no correct');
      //           }

                // console.log('answer.id   ', answer.id);
                // console.log('this.quizAnswers[varI]   ', this.quizAnswers[varI]);
                // console.log('userResult[varI].chosenAnswerId  ', userResult[varI].chosenAnswerId);
                // console.log(answer.answer);
                const optionElementAnswer = document.createElement('div');
                optionElementAnswer.className = 'answer-question-option';
                const inputElementAnswer = document.createElement('div');
                inputElementAnswer.className = 'option-answer';
                inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#6933DC" /><circle cx="10" cy="10" r="7" fill="white" /></svg>';

                if (answer.correct === true) {
                    console.log(answer.correct);
                    // console.log(' no correct');
                        optionElementAnswer.classList.add('green');
                        inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#5FDC33"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';

                }
                if (answer.correct === false) {
                    console.log(answer.correct);
                    //  alert('--------------------');
                    optionElementAnswer.classList.add('red');
                    inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#DC3333"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';
                }

                //
                // if ((this.quizAnswers[varI] === userResult[varI].chosenAnswerId) && (userResult[varI].chosenAnswerId === answer.id)) {
                //     // alert('+++++++++++++++++++');
                //     optionElementAnswer.classList.add('green');
                //     inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#5FDC33"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';
                // }
                // if ((this.quizAnswers[varI] !== userResult[varI].chosenAnswerId) && (userResult[varI].chosenAnswerId === answer.id)) {
                //     //  alert('--------------------');
                //     optionElementAnswer.classList.add('red');
                //     inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#DC3333"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';
                // }

                const labelElement = document.createElement('div');
                labelElement.innerText = answer.answer;
                optionElementAnswer.appendChild(inputElementAnswer);
                optionElementAnswer.appendChild(labelElement);
                optionElementAllAnswer.appendChild(optionElementAnswer);
                optionElementAll.appendChild(optionElementAllAnswer);

            });
            varI = varI + 1;
            this.optionsElement.appendChild(optionElementAll);
        });

    }
    // showQuestion() {
    //
    //     document.getElementById('answer-pre-title2').innerText = this.quizQuestions.name;
    //     const userResult = JSON.parse(sessionStorage.getItem('cartUserResult'));
    //     console.log('userResult: - const userResult  ', userResult);
    //     console.log('userResult: - const userResult chosenAnswerId: ', userResult[0].chosenAnswerId);
    //     console.log('AllQuestions - this.quizQuestions: ', this.quizQuestions);
    //     let varI = 0;
    //
    //     this.quizQuestions.questions.forEach(item => {
    //         // console.log(item);
    //         // console.log(item.question);
    //         // console.log(item.answers);
    //         // console.log('truAnswers - this.quizAnswers', this.quizAnswers);
    //         // console.log('truAnswers - this.quizAnswers []  ', this.quizAnswers[varI]);
    //         // console.log(varI);
    //         const optionElementAll = document.createElement('div');
    //         optionElementAll.className = 'answer-question';
    //         const optionElement = document.createElement('div');
    //         optionElement.className = 'answer-question-title';
    //         const optionElementAllAnswer = document.createElement('div');
    //         optionElementAllAnswer.className = 'answer-question-options';
    //         optionElement.innerHTML = '<span>Вопрос: ' + this.currentQuestionIndex + ' </span>' + item.question;
    //         optionElementAll.appendChild(optionElement);
    //         this.currentQuestionIndex++;
    //         console.log(item.answers);
    //
    //         item.answers.forEach(answer => {
    //             // console.log('answer.id   ', answer.id);
    //             // console.log('this.quizAnswers[varI]   ', this.quizAnswers[varI]);
    //             // console.log('userResult[varI].chosenAnswerId  ', userResult[varI].chosenAnswerId);
    //             // console.log(answer.answer);
    //             const optionElementAnswer = document.createElement('div');
    //             optionElementAnswer.className = 'answer-question-option';
    //             const inputElementAnswer = document.createElement('div');
    //             inputElementAnswer.className = 'option-answer';
    //             inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#6933DC" /><circle cx="10" cy="10" r="7" fill="white" /></svg>';
    //
    //             if ((this.quizAnswers[varI] === userResult[varI].chosenAnswerId) && (userResult[varI].chosenAnswerId === answer.id)) {
    //                 // alert('+++++++++++++++++++');
    //                 optionElementAnswer.classList.add('green');
    //                 inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#5FDC33"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';
    //             }
    //             if ((this.quizAnswers[varI] !== userResult[varI].chosenAnswerId) && (userResult[varI].chosenAnswerId === answer.id)) {
    //                 //  alert('--------------------');
    //                 optionElementAnswer.classList.add('red');
    //                 inputElementAnswer.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#DC3333"/><circle cx="10" cy="10" r="4" fill="white"/></svg>';
    //             }
    //
    //             const labelElement = document.createElement('div');
    //             labelElement.innerText = answer.answer;
    //             optionElementAnswer.appendChild(inputElementAnswer);
    //             optionElementAnswer.appendChild(labelElement);
    //             optionElementAllAnswer.appendChild(optionElementAnswer);
    //             optionElementAll.appendChild(optionElementAllAnswer);
    //
    //         });
    //         varI = varI + 1;
    //         this.optionsElement.appendChild(optionElementAll);
    //     });
    // }
}

/* result.test.questions[0].answers[1].correct*/

