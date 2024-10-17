import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Result {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        console.log('userInfo.userId   ' + userInfo.userId);
        console.log('this.routeParams.id   ' + this.routeParams.id);
   //    alert('this.routeParams.id   ' + this.routeParams.id);
  //      alert('userInfo.userId   ' + userInfo.userId);
        // document.getElementsByClassName ('pass-question-result').innerHtml = '<a href="#/answers?id=' + this.routeParams.id + '" id="pass">Посмотреть правильные ответы <img src="/images/small-arrow.png" alt="Стрелка далее"></a>';
        // document.getElementById ('pass-question-results').innerHTML = '<a href="#/answers?id=' + this.routeParams.id + '" id="pass">Посмотреть правильные ответы <img src="/images/small-arrow.png" alt="Стрелка далее"></a>';
        document.getElementById ('pass-question-results').innerHTML = '<a href="#/answers?id=' + this.routeParams.id + '" id="pass">Посмотреть правильные ответы <img src="/images/small-arrow.png" alt="Стрелка далее"></a>';
        if (!userInfo) {
            console.log('userInfo.userId   ' + userInfo.userId);
            alert('userInfo.userId   ' + userInfo.userId);
            location.href = '#/'
        }

 /////////       if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId);
                //console.log('result  ' + result);
                console.log('result.score ' + result.score);
                console.log('result.total  ' + result.total);
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
///////////////////////////////
                    console.log(this.routeParams.id);

                    const resultArray = [];
                    console.log(sessionStorage);
                  //  const testScore = JSON.parse(sessionStorage.getItem('result-score'));
                    const testScore = result.score + '/' + result.total;
                    console.log('testScore 1 ' + testScore);
                    if (testScore === "null/null") {
                        // const phrase = testScore.join(' ');
                        console.log('testScore 2 "null/null "' + testScore);
                        document.getElementById('result-score').innerText = '';
                    } else {
                        console.log('testScore 3 else ' + testScore);
                        console.log(typeof testScore);
                        document.getElementById('result-score').innerText = testScore;

                        // //   sessionStorage
                        // const url = new URL(location.href);
                        // console.log(sessionStorage);
                        // // document.getElementById('result-score').innerText = url.searchParams.get('score') +
                        // // '/' + url.searchParams.get('total');
                        // console.log(document.getElementById('result-score').innerText);
                        // sessionStorage.setItem('result-score', JSON.stringify(document.getElementById('result-score').innerText));
                        // //location.href = 'answers.html';
                        // console.log(sessionStorage);
                    }
                    return;

//////////////////////////////////////////
                    //   location.href = '#/result?id=' + this.routeParams.id;
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
   ///////////     }
        alert('userInfo.userId  END   ' + userInfo.userId);
     //   alert('   error  location.href = \'#/\' ');
        location.href = '#/'
    }
}
