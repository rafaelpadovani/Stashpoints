import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import NavBar from './navbar.js';
import Card from './card.js';
import { Button, Form, FormGroup, Alert } from 'reactstrap';
import {Input, Row} from 'react-materialize';

import './index.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: 13,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
      data: [],
      showCards: true,
      citySearch: '',
      sortType: 'by_capacity',
      alertShow: false
    };

  }

  handleCityChange = (e) => {
    this.setState({citySearch: e.target.value});
  }

  handleSortTypeChange = (e) => {
    this.setState({sortType: e.target.value});
  }


  handleSearch = () => {
    if(this.state.citySearch === ''){
      this.setState({alertShow: true});
      return;
    }
    let URL = "https://api-staging.stasher.com/v1/stashpoints?city=";
    URL = URL + this.state.citySearch + '&sort_order=' + this.state.sortType;
    fetch(URL)
    .then( (response) => {
        return response.json() })   
            .then( (json) => {
                this.setState({data: json});

                let map = new window.google.maps.Map(document.getElementById('map'), {
                  center: {lat: this.state.data[0].nearest_city.centre.latitude, lng: this.state.data[0].nearest_city.centre.longitude},
                  zoom: 13,
                  mapTypeId: 'roadmap',
                });
            
                map.addListener('zoom_changed', () => {
                  this.setState({
                    zoom: map.getZoom(),
                  });
                });
            
                map.addListener('maptypeid_changed', () => {
                  this.setState({
                    maptype: map.getMapTypeId(),
                  });
                });
            
                let marker;
                let inputNode;
                let autoComplete;
                let place;
                let location;
                for(let i=0;i<this.state.data.length;i++){
                  marker = new window.google.maps.Marker({
                    map: map,
                    position: {lat: this.state.data[i].latitude, lng: this.state.data[i].longitude},
                  });
              
                  // initialize the autocomplete functionality using the #pac-input input box
                  inputNode = document.getElementById('pac-input');
                  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
                  autoComplete = new window.google.maps.places.Autocomplete(inputNode);
              
                  autoComplete.addListener('place_changed', () => {
                    place = autoComplete.getPlace();
                    location = place.geometry.location;
              
                    this.setState({
                      place_formatted: place.formatted_address,
                      place_id: place.place_id,
                      place_location: location.toString(),
                    });
              
                    // bring the selected place in view on the map
                    map.fitBounds(place.geometry.viewport);
                    map.setCenter(location);
              
                    marker.setPlace({
                      placeId: place.place_id,
                      location: location,
                    });
              
                  });
                }
            });

    

  }


  render() {
    
    let cardList = null;

      cardList = (
        <div>
          {this.state.data.map((data, index) => {
            return <Card
            name={data.name}
            address={data.address}
            status={data.status}
            photos={data.photos}
            description={data.description}
            key={data.id}/>
          })}
        </div>
      );

    return (
      <div id='app'>
        <NavBar />
        <Alert color="primary" isOpen={this.state.alertShow} toggle={this.onDismiss} fade={false}>
          Enter a city first
        </Alert>
        <SplitterLayout>
          <div>
            <Form>
              <FormGroup>
                  <Input type="text" name="search" id="exampleEmail" value={this.state.citySearch} onChange={this.handleCityChange} placeholder="Try 'London', 'Paris', 'Rome'" />
              </FormGroup>
              <Row>
                <Button className="left" s={6} type="button" onClick={this.handleSearch}>Find Luggage Storage</Button>
                <div className="right">
                  <Input type='select' label="Sort By" defaultValue='2' onChange={this.handleSortTypeChange}>
                    <option value='by_distance'>Capacity</option>
                    <option value='by_capacity'>Distance</option>
                  </Input>
                </div>
              </Row>
            </Form>
            {cardList}
          </div>
          <div id='map' />
        </SplitterLayout>
      </div>
    );
  }
};
