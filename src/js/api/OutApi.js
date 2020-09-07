export default class OutApi {
  constructor() {
    this.APIkey = '4117714a4686484785d1de46224edb53',
    // this.url = 'https://newsapi.org/v2/everything?';
    this.url = 'https://nomoreparties.co/news/v2/everything?' // через прокси
  }

  getArticles(theme, dateFrom) {
    const newUrl = `${this.url
    }q=${theme}&`
    + `from=${dateFrom}&`
    + 'sortBy=popularity&'
    + `apiKey=${this.APIkey}`;
    return (
      fetch((newUrl), {
      })
      .then((res) => {return res.json()})
      .then((result) => {return (result.articles)})
      .catch((err) => console.log(err))

    );
  }
}
