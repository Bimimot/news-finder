export default class MainApi {
  constructor() {
    this.url = 'https://newsfinder.tk/api';
    // this.url = 'http://localhost:3000/api';

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

  signup(mail, pass, name) {
    return (
      fetch((`${this.url}/signup`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({
          email: mail,
          password: pass,
          name: name
        }),
      })
    );
  }

}

// getArticles(){

// }

// createArticle(){

// }

// removeArticle(){

// }

