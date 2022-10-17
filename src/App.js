import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: null,
    };
  }

  // 44bbac4daf4709e837068fed365ea4e3
  // c085361734abb2056c9617f340a42999

  componentDidMount() {
    fetch("http://api.mediastack.com/v1/news?access_key=8c676a2d2f14a60205b679ba53a4c6fa&categories=health,sports,technology&countries=us&limit=5", {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          isLoaded: true,
          results: data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, results } = this.state;
    if (error) {
      return (
        <div style={{ textAlgin: 'center', padding: 20 }}>Error: {error.message}</div>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ textAlign: 'center', padding: 20 }}>Loading...</div>
      );
    } else {
      return (
        <div>
          {results.data.map((result) => {
            return (
              <div style={{ width: 1000, margin: 'auto' }}>
                <div className='block'>
                  <div className='image'>
                    {result.image ? <img src={result.image} style={{ borderRadius: 10, width: '100%' }} alt='news' /> : <img src='https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png' style={{ borderRadius: 10, width: '100%' }} alt='news' />}
                  </div>
                  <div className='text'>
                    <span>{result.published_at}</span>｜
                    <span className='category'>{result.category}</span>｜
                    <span>{result.author ? result.author : 'No author'}</span>
                    <h2>{result.title}</h2>
                    <p>{result.description}</p>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">Read More</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )
    }
  }
}

export default App;
