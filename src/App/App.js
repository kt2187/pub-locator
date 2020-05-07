import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';
import Map from './Map';
import { FoursquareService } from '../services';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venueFilterText: '',
      sidebarVisible: true,
      venues: [],
      selectedVenueId: null,
      venueDetailsById: {},
      error: null,
    };
  }

  componentDidMount() {
    this.loadVenues();
  }

  loadVenues = () => {
    FoursquareService.getRecommendedVenues('drinks', 'Pawtucket')
      .then(venues => {
        this.setState({
          venues,
        });
      })
      .catch(errorDetails => this.handleFatalError('Failed to load venues', errorDetails));
  }

  loadVenueDetails = venueId => {
    const venueDetailsById = this.state.venueDetailsById;

    if (!venueDetailsById[venueId] || venueDetailsById[venueId].error) {
      const updateVenueDetails = venueDetails => {
        this.setState({
          venueDetailsById: {
            ...venueDetailsById,
            [venueId]: venueDetails,
          },
        });
      };

      updateVenueDetails({ loading: true });

      FoursquareService.getVenueDetails(venueId)
        .then(updateVenueDetails)
        .catch(errorDetails => updateVenueDetails({
          error: {
            message: 'Failed to load venue details',
            details: errorDetails,
          },
        }));
    }
  }

  handleSidebarToggle = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible,
    });
  }

  handleVenueFilterChange = venueFilterText => {
    this.setState({
      venueFilterText,
    });
  }

  handleVenueClick = venueId => {
    this.loadVenueDetails(venueId);
    this.setState({
      selectedVenueId: venueId === this.state.selectedVenueId ? null : venueId,
    });
  }

  handleFatalError = (message, details) => {
    this.setState({
      error: {
        message,
        details,
      },
    });
  }

  render() {
    const filteredVenues = this.state.venues && this.state.venues
      .filter(venue => venue.name.toLowerCase().includes(this.state.venueFilterText.toLowerCase()));
    return (
      <main className={`App${this.state.error ? ' error' : ''}`}>
        {!this.state.error && (
          <>
            {this.state.sidebarVisible && <Sidebar
              venues={filteredVenues}
              venueFilterText={this.state.venueFilterText}
              selectedVenueId={this.state.selectedVenueId}
              onVenueFilterChange={this.handleVenueFilterChange}
              onVenueClick={this.handleVenueClick}
            />}
            <div role="application" className='content'>
              <Header onSidebarToggle={this.handleSidebarToggle} sidebarVisible={this.state.sidebarVisible} />
              <Map
                venues={filteredVenues} selectedVenueId={this.state.selectedVenueId}
                venueDetailsById={this.state.venueDetailsById}
                onVenueClick={this.handleVenueClick}
                onInitializationError={this.handleFatalError}
              />
            </div>
          </>
        )}
        {this.state.error && (
          <div role="textbox" className="error-container">
            <h3>Something is not right</h3>
            <p>{this.state.error.message}</p>
            <p>Please reload and try again</p>
          </div>
        )}
      </main>
    );
  }
}