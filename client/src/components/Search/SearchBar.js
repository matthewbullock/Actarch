import React, {Component} from 'react';
import {
  Input,
} from 'semantic-ui-react'

import GenericTable from './Tables/GenericTable/GenericTable'
import ActorPage from '../DataPage/ActorPage'
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorTable: false,
      actorId : '',
      movieTable: false,
      value: '',
      actor: '',
      tableData:[],
      actorData:[],
      actorInfo:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleOn = this.toggleOn.bind(this);
    this.toggleOff = this.toggleOff.bind(this);
    this.getData = this.getData.bind(this);
    this.getActorsInfo = this.getActorsInfo.bind(this);
  }

  //this is to pass the state function down as props so we can toggle the state in child components
  toggleOn(){
    this.setState({actorTable: true})
  }

  toggleOff() {
    this.setState({actorTable: false})
  }

  getActors(){
    let param = this.state.value
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US&query=${param}&page=1&include_adult=false`)
      .then(response => {
        this.setState({tableData: response.data})
      })
  }

  getActorsInfo(){
    let param = this.state.actorId
    axios.get(`https://api.themoviedb.org/3/person/${param}?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US`)
    .then(response => {
      this.setState({actorInfo: response.data})
    })
  }

  getData(val , id){
    //emptys genericTable and populates actorData
    this.setState(
      {
        tableData: [],
        actorData: val.data,
        actorId: id,
      }
    );

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.toggleOn();
    this.getActors();
    event.preventDefault();
  }

  render() {

    let display
    let genericTable
    let actorInformation

    if(this.state.tableData.length !== 0){
      display = <GenericTable value={this.state.value} sendData={this.getData} tableData={this.state.tableData} toggleOn={this.toggleOn} toggleOff={this.toggleOff} />
    } else if(this.state.actorData.length !== 0){
      display = <ActorPage value={this.state.value} sendData={this.getData} getActorsInfo={this.getActorsInfo} actorInfo={this.state.actorInfo} actorData={this.state.actorData} toggleOn={this.toggleOn} toggleOff={this.toggleOff} />
    }

    return (
      <div className="Actor">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <Input type="text" value={this.state.value} onChange={this.handleChange} action='Search' placeholder='Search...' />
            </label>
          </form>
          {display}
        </div>
      </div>
    );
  }
}

export default SearchBar
