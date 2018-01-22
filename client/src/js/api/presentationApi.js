import fetch from 'isomorphic-fetch';
// The CONFIG object is external and is made available
// through an old fashioned script tag

const LIST_PRESENTATION_PATH = 'list.json';
const PAGES_PATH = 'pages.json';

const presentationApi = {
  apiFetchPresentation: function (path) {
    return new Promise(function (resolve, reject) {
        let url = CONFIG.baseServerUrlPath + path + '/' + PAGES_PATH;
        fetch(url).then(
          response => {
            if (response.status >= 400) {
              reject(response);
            }
            resolve(response.json());
          },
          error => {
            console.log("error");
            reject(error);
          },
        )
      }
    )
  },
  apiFetchPresentationList: function () {
    return new Promise(function (resolve, reject) {
        let url = CONFIG.baseServerUrlPath + LIST_PRESENTATION_PATH;
        fetch(url).then(
          response => {
            console.log(response);
            if (response.status >= 400) {
              reject(response);
            }
            resolve(response.json());
          },
          error => {
            reject(error);
          },
        )
      }
    )
  },
}

export default presentationApi;
