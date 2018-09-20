import React, {Component} from 'react';
import {
  Table
} from 'semantic-ui-react'

import GenericTableBody from './GenericTableBody'

class GenericTable extends Component {

  render() {
    return(
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Results for <span id="searchName">{this.props.value}</span>:</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <GenericTableBody tableData={this.props.tableData} sendData={this.props.sendData} toggleOn={this.props.toggleOn} toggleOff={this.props.toggleOff} />
      </Table>
    );
  }
}



export default GenericTable;
