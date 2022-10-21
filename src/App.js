import React from 'react';
import './App.css';
import Dropdown from './Dropdown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: null,
      offset: 0,
      category: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.body.offsetHeight) {
      console.log('you are at the bottom of the page');
      window.removeEventListener('scroll', this.handleScroll);
      this.handleFetch(this.state.category, true).then(() => {
        window.addEventListener('scroll', this.handleScroll);
      });
    };
  };

  handleFetch(category, isCategorySame) {
    const url = 'http://api.mediastack.com/v1/news';
    const apiKey = '?access_key=' + '499e8f0589a5ec85f200c07236570b88';
    const categories = `&categories=${category}`;
    const countries = '&countries=us';
    const limit = '&limit=10';
    // const offset = `&offset=${this.state.offset}`;
    const offset = isCategorySame ? `&offset=${this.state.offset}` : '&offset=0';
    const sort = '&sort=published_desc';
    return fetch(url + apiKey + categories + countries + limit + offset + sort, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(this.state.offset);
        if ((data.data.length > 0) && (isCategorySame)) {
          this.setState({
            isLoaded: true,
            results: { data: [...this.state.results.data, ...data.data] },
            offset: this.state.offset + 10,
          });
          // console.log(this.state.offset)
        } else {
          this.setState({
            isLoaded: true,
            results: data,
            offset: 0,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  handleSelect = (e) => {
    const isCategorySame = e.target.value === this.state.category;
    // console.log(isCategorySame);
    this.setState({
      category: e.target.value,
    });
    this.handleFetch(e.target.value, isCategorySame);
  }

  render() {
    const { error, isLoaded, results, category } = this.state;
    if (error) {
      return (
        <div style={{ textAlgin: 'center', padding: 20 }}>Error: {error.message}</div>
      );
    } else {
      return (
        <div>
          <div style={{ textAlign: 'center' }}>
          {!isLoaded ? <h1 style={{ textAlign: 'center' }}>Please select a category</h1> : <h1 style={{ textAlign: 'center' }}>News</h1>}
            <select value={category} onChange={this.handleSelect} className='select'>
              <option disabled value=''>Please select a category...</option>
              <option value='health'>Health</option>
              <option value='sports'>Sports</option>
              <option value='technology'>Technology</option>
            </select>
          </div>
          {isLoaded && results.data
            .map((result, index) => {
              return (
                <div style={{ width: '100%', margin: '0 auto' }} key={index}>
                  <div className='block'>
                    <div className='image'>
                      {result.image ? <img src={result.image} style={{ borderRadius: 10, width: '100%' }} alt='news' /> : <img src='https://v4.tocas-ui.com/zh-tw/assets/images/1-1.png' style={{ borderRadius: 10, width: '100%' }} alt='news' />}
                    </div>
                    <div className='text'>
                      <span className='date'>{result.published_at.slice(0, 10)}</span> &nbsp;
                      <span className='time'>{result.published_at.slice(11, 19)}</span>｜
                      <span className='category'>{result.category}</span>｜
                      <span className='author'>{result.author ? result.author : 'No author'}</span>
                      <h2>#{index + 1} -- {result.title}</h2>
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
