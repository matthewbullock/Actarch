import React, {Component} from 'react';
import {
  Table
} from 'semantic-ui-react'

import GenericTableRow from './GenericTableRow'

class GenericTableBody extends Component {

  render() {
    let actors;

    if(this.props.tableData.length !== 0){
        actors = this.props.tableData.results.map((actor , index) => {
          return(
            <GenericTableRow key={index} actor={actor} toggleOn={this.props.toggleOn} toggleOff={this.props.toggleOff} sendData={this.props.sendData}/>
          );
        });
    }

    return(
      <Table.Body>
        {actors}
      </Table.Body>
    );
  }
}

export default GenericTableBody;
