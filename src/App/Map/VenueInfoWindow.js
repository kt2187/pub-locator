import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from 'react-google-maps';

import './VenueInfoWindow.css';

export default class VenueInfoWindow extends Component {

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
        onClose: PropTypes.func,
    }

    static defaultProps = {
        venueDetails: {},
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose(this.props.venue.id);
        }
    }
    
    render() {
        const {
            venue,
            venueDetails,
        } = this.props;

        const [
            addressLine1,
            addressLine2,
        ] = venue.location.formattedAddress;

        const categories = venueDetails.categories && venueDetails.categories
            .map(category => category.name)
            .filter(categoryName => categoryName)
            .join(', ');
        return (
            <InfoWindow onCloseClick={() => this.handleClose()}>
                <div className="VenueInfoWindow" >
                    <div className="VenueInfoWindow-name">{venue.name}</div>
                    <div className="VenueInfoWindow-address-line-1">{addressLine1}</div>
                    <div className="VenueInfoWindow-address-line-2">{addressLine2}</div>
                    {categories && <p className="VenueInfoWindow-categories">{categories}</p>}
                    {venueDetails.description && <p className="VenueInfoWindow-description">{venueDetails.description}</p>}

                    {venueDetails.loading && <p className="VenueInfoWindow-loading">More details loading...</p>}
                    {venueDetails.error && <p className="VenueInfoWindow-error">Error loading details.</p>}
                </div>
            </InfoWindow>
        );
    }
}