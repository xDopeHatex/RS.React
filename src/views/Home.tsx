import { Component } from 'react';
import { Outlet } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <h1>
        Home <Outlet />
      </h1>
    );
  }
}
