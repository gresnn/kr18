export class UrlManager {

    static getQueryParams() {
       const qs = document.location.hash.split('+').join(' ');

       let params = {},
           tokens,
           re = /[?&]([^=]+)=([^&]*)/g;

       while (tokens = re.exec(qs)) {
           params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);

       }
       return params;
    }

   static checkUserdata(params) {
        // const url = new URL(location.href);
        // const name = url.searchParams.get('name');
        // const lastName = url.searchParams.get('lastName');
        // const email = url.searchParams.get('name');

        if (!params.name || !params.lastName || !params.email) {
            location.href = '#/';
        }
    }
}