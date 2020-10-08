import React from 'react';

class Result extends React.Component {
    render() {
        let hasMisson = false;
        const { output } = this.props;
        
        return(
            <div class="split_right">
                <div class="mission_tray">
                        {output.map(element => (
                            <div class="div-table">
                                <img src={element["links"]["mission_patch_small"]} />
                                <h3>Mission ids:</h3>
                                <label>{element["mission_id"]}</label>

                                <h3>Launch Year:</h3>
                                <label>{element["launch_year"]}</label>

                                <h3>Successful Launch:</h3>
                                <label>{element["launch_success"] === true ? "Yes" : "No" }</label>

                                <h3>Successful Landing:</h3>
                                <label>{element["rocket"]["first_stage"]["cores"][0]["land_success"] === true ? "Yes" : "No" }</label>
                            </div>
                        ))}
                </div>
            </div>
        )
    }
}


export default Result;