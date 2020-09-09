import React from 'react';

class Filter extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.onFilterUpdate(event.target.name, event.target.value);
    }

    render() {
        let years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

        return(
            <div class="split_left">
                <h2>Space X Launch Programs</h2>
                <h2>Filters</h2>
                <div class="year-filter">
                    <h3>Launch Year</h3>
                    { years.map(year => <button name="launch_year" value={year} className="filterButton" onClick={this.handleClick}>{year}</button> )}
                </div>

                <div class="launch-filter">
                    <h3>Successful Launch</h3>
                    <button name="launch_success" value={true} className="filterButton" onClick={this.handleClick}>True</button>
                    <button name="launch_success" value={false} className="filterButton" onClick={this.handleClick}>False</button>
                </div>

                <div class="landing-filter">
                    <h3>Successful Landing</h3>
                    <button name="land_success" value={true} className="filterButton" onClick={this.handleClick}>True</button>
                    <button name="land_success" value={false} className="filterButton" onClick={this.handleClick}>False</button>
                </div>
            </div>
        )
    }
}

export default Filter;