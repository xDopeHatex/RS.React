import './App.scss';
import { Component } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
      </div>
    );
  }
}
