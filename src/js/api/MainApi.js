export default class MainApi {
  constructor() {
    // this.url = 'http://newsfinder.tk/api';
    this.url = 'http://localhost:3000/api';
  }

  login(mail, pass) {
    return (
      fetch((`${this.url}/signin`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({
          email: mail,
          password: pass,
        }),
      })
    );
  }

  getMe() {
    return (
      fetch((`${this.url}/users/me`), {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      })
        .then((res) => res.json())
        .then((result) => {return (result.data)})

    );
  }
}

// signup(){

// }

// getUserData(){

// }

// getArticles(){

// }

// createArticle(){

// }

// removeArticle(){

// }

// setProfile(newName, newAbout) {                                                                       //передаем новые данные профиля
//   return (
//     fetch((this.baseUrl + '/users/me'), {
//       method: 'PATCH',
//       headers: this.headers,
//       body: JSON.stringify({
//         name: newName,
//         about: newAbout
//       })
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//   )
// }

// const api = new Api({
//   baseUrl: 'https://praktikum.tk/cohort10',
//   headers: {
//     authorization: 'caf701ff-6f39-4585-92c8-ebdddadba86b',
//     'Content-Type': 'application/json'
//   }
// });

// getUser() {                                                                                             //получаем данные пользователя
//   return(
//   fetch((this.baseUrl + '/users/me'), {
//     headers: this.headers
//   })
//   .then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   })
// )
// }
