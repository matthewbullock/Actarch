import React, {Component} from 'react';
import SearchBar from './SearchBar'

class Search extends Component {
  render() {
    return(
      <div className="searchBar">
        <h3>Search Here:</h3>
        <SearchBar />
      </div>
    )
  }
}

export default Search
