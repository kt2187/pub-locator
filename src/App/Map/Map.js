import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import { googleApiKey } from '../../config';
import VenueMarker from './VenueMarker';

const Map = withScriptjs(withGoogleMap(props => (
    <GoogleMap
        defaultCenter={{lat: 41.8787, lng: -71.3826}}
        defaultZoom={13}
    >
        {props.venues && props.venues.map(venue => (
            <VenueMarker
                key={venue.id}
                venue={venue}
                venueDetails={props.venueDetailsById[venue.id]}
                selected={props.selectedVenueId === venue.id}
                onClick={props.onVenueClick}
            />
        ))}
    </GoogleMap>
)));

Map.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        location: PropTypes.shape({
            formattedAddress: PropTypes.arrayOf(PropTypes.string),
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    })),
    venueDetailsById: PropTypes.object,
    selectedVenueId: PropTypes.string,
    onVenueClick: PropTypes.func,
    onInitializationError: PropTypes.func,
};

export default class extends Component {
    componentDidMount() {
        window.gm_authFailure = this.handleAuthFailure;
    }

    handleAuthFailure = () => {
        const message = 'Google Maps initialization failed';
        const details = 'Google Maps API error: Auth failure';
        console.error(message, details);
        if (this.props.onInitializationError) {
            this.props.onInitializationError(message, details);
        }
    }

    render() {
        return (
            <Map
                role="application"  
                aria-label="google map"
                a   
                {...this.props}
                loadingElement={<div className="Map-loading" />}
                containerElement={<div className="Map" />}
                mapElement={<div id="map" />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
            />
        );
    }
}
