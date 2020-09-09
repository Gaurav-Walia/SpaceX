import React from 'react';
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
    let query = "";
    if (key === "launch_year") { this.setState({ launch_year: value }); }
    else if (key === "launch_success") { this.setState({ launch_success: value }); }
    else if (key === "land_success") { this.setState({ land_success: value }); } 
    else { this.setState({ launch_year: 2014, launch_success: true, land_success: true  }); }

    if (this.state.launch_year && this.state.launch_success && this.state.land_success) {
      query = "&launch_year=" + this.state.launch_year + "&launch_success=" + this.state.launch_success + "&land_success=" + this.state.land_success;
    } 

    else if (this.state.launch_year) {
      query = "&launch_year=" + this.state.launch_year;
    }

    else if (this.state.launch_success) {
      query = "&launch_success=" + this.state.launch_success;
    }
    
    else if (this.state.launch_success) {
      query = "&land_success=" + this.state.land_success;
    } 

    console.log(query);
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
      <div class="container">
        <div class="row">
          <Filter onFilterUpdate = {this.handleClick} />
          <Result output={this.state.output} />
        </div>
    </div>
    )
  }
}

export default App;
