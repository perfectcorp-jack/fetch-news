import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: null,
      category: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('you are at the bottom of the page');
        console.log(this.state.category)
      }
    })
  }

  // 44bbac4daf4709e837068fed365ea4e3
  // c085361734abb2056c9617f340a42999

  handlefetch(category) {
    fetch("http://api.mediastack.com/v1/news?access_key=44bbac4daf4709e837068fed365ea4e3&categories=" + category + "&countries=us&limit=25", {})
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

  handleSelect(e) {
    this.setState({
      category: e.target.value,
    });
    this.handlefetch(e.target.value);
  }

  render() {
    const { error, isLoaded, results, category } = this.state;
    if (error) {
      return (
        <div style={{ textAlgin: 'center', padding: 20 }}>Error: {error.message}</div>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>Please select a category</h1>
          <select value={category} onChange={this.handleSelect} className='select'>
            <option disabled value=''>Please select a category...</option>
            <option value='health'>Health</option>
            <option value='sports'>Sports</option>
            <option value='technology'>Technology</option>
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>News</h1>
          <div style={{ textAlign: 'center' }}>
            <select value={category} onChange={this.handleSelect} className='select'>
              <option disabled value=''>Please select a category...</option>
              <option value='health'>Health</option>
              <option value='sports'>Sports</option>
              <option value='technology'>Technology</option>
            </select>
          </div>
          {results.data.map((result) => {
            return (
              <div style={{ width: 1000, margin: 'auto' }}>
                <div className='block'>
                  <div className='image'>
                    {result.image ? <img src={result.image} style={{ borderRadius: 10, width: '100%' }} alt='news' /> : <img src='https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png' style={{ borderRadius: 10, width: '100%' }} alt='news' />}
                  </div>
                  <div className='text'>
                    <span className='date'>{result.published_at.slice(0, 10)}</span> <span className='time'>{result.published_at.slice(11, 19)}</span>｜
                    <span className='category'>{result.category}</span>｜
                    <span className='author'>{result.author ? result.author : 'No author'}</span>
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
