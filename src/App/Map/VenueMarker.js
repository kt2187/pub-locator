import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import VenueInfoWindow from './VenueInfoWindow';

export default class VenueMarker extends Component {

    static propTypes = {
        venue: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            location: PropTypes.shape({
                formattedAddress: PropTypes.arrayOf(PropTypes.string),
                lat: PropTypes.number,
                lng: PropTypes.number,
            }),
        }).isRequired,
        venueDetails: PropTypes.object,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        selected: false,
        venueDetails: {},
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.venue.id);
        }
    }
    
    render() {
        const {
            venue,
            venueDetails,
            selected,
        } = this.props;

        return (
            <Marker
                   
                key={venue.id}
                position={venue.location}
                animation={selected ? window.google.maps.Animation.BOUNCE : null}
                onClick={() => this.handleClick()}
            >
                {selected && <VenueInfoWindow
                    venue={venue}
                    venueDetails={venueDetails}
                    onClose={() => this.handleClick()}
                />}
            </Marker>
        );
    }
}