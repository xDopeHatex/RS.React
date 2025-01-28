import './SearchBar.scss';
import { Component } from 'react';
import Input from './UI/Input.tsx';
import Button from './UI/Button.tsx';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <Input
          placeholder={'Type what kind of beer are you looking for?'}
          onChange={() => console.log('onChange')}
        />
        <Button title="Search" onClick={() => console.log('yeah')} />
      </div>
    );
  }
}
