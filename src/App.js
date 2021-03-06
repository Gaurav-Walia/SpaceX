import React from 'react';
import { withRouter } from 'react-router'
import './App.css';
import Filter from './Filter';
import Result from './Result';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        launch_year: null,
        launch_success: null,
        land_success: null,  
        output: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100")
        .then(res => res.json())
        .then(result => {
            this.setState({
                output: result
            })
        });
    }

  handleClick(key, value) {
    let query = "&" + key + "=" + value;
   
    fetch(`https://api.spaceXdata.com/v3/launches?limit=100` + query)
        .then(res => res.json())
        .then(result => {
            this.setState({
                output: result
            })
        });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <header style={{ textAlign: "center", fontSize: "xx-large" }}>Space X Launch Programs</header>
        </div>

        <div className="row">
          <Filter onFilterUpdate = {this.handleClick} />
          <Result output={this.state.output} />
        </div>
      </div>
    )
  }
}

export default withRouter(App);
