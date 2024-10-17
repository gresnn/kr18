import {Auth} from "./auth.js";

export class CustomHttp {
    static async request(url, method = 'GET', body = null){
        
        const params =  {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        let token = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['x-access-token'] = token;
        }
        // body: JSON.stringify({
        //     name: this.fields.find(item =>item.name === 'name').element.value,
        //     lastName: this.fields.find(item =>item.name === 'lastName').element.value,
        //     email: this.fields.find(item =>item.name === 'email').element.value,
        //     password: this.fields.find(item =>item.name === 'password').element.value,
        // })


        if (body) {
            params.body = JSON.stringify(body);

        }

        const response = await fetch(url, params);

        console.log(response.status);
  //      alert(response.status);
        console.log(response.statusText);
  //      alert(response.statusText);
        if (response.status < 200 || response.status >= 300) {
            if (response.status === 400) {
                alert('ПРОВЕРЬТЕ ВВЕДЁННЫЕ ДАННЫЕ! ');
            }
            if (response.status === 401) {
                const result = await Auth.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body);
                } else {
                    return null;
                }
            }


            throw new Error(response.message);
        }

        return await response.json();

        // const result = await response.json();
        // if (result) {
        //     if (result.error || !result.user) {
        //         throw new Error(result.message);
        //     }
        //
        //     location.href = '#/choice';
        //
        // }
    }
}