export default class MainApi {
  constructor() {
    this.url = 'https://newsfinder.tk/api';
//    this.url = 'http://localhost:3000/api';
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
        .then((result) => (result.data))

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
          name,
        }),
      })
    );
  }

  createArticle(cardData) {
    return (
      fetch((`${this.url}/articles`), {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: cardData.cardKey,
          title: cardData.cardTitle,
          text: cardData.cardText,
          date: cardData.cardDateIso,
          source: cardData.cardSign,
          link: cardData.cardUrl,
          image: cardData.cardImageUrl,
        }),
        // credentials: 'include',
      })
        .then((res) => res.json())
    );
  }

  removeArticle(id) {
    return (
      fetch((`${this.url}/articles/${id}`), {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      })
        .then((res) => res.json())
    );
  }

  getArticles() {
    return (
      fetch((`${this.url}/articles/`), {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      })
        .then((res) => res.json())
    );
  }
}

