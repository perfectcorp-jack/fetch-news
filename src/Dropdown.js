import React from 'react';
import './App.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const sameCategory = e.target.value === this.state.category;
    // console.log(sameCategory);
    this.setState({
      category: e.target.value,
    });
    this.props.handleFetch(e.target.value, sameCategory);
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <select value={this.state.category} onChange={this.handleSelect} className='select'>
            <option disabled value=''>Please select a category...</option>
            <option value='health'>Health</option>
            <option value='sports'>Sports</option>
            <option value='technology'>Technology</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Dropdown;
