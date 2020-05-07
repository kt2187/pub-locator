import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarFilter from './SidebarFilter'; 
import './Sidebar.css';
import poweredByFoursquareImage from './powered-by-foursquare.png';

export default class Sidebar extends Component {

    static propTypes = {
        venues: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })),
        selectedVenueId: PropTypes.string,
        venueFilterText: PropTypes.string,
        onVenueFilterChange: PropTypes.func.isRequired,
        onVenueClick: PropTypes.func,
    }


    static defaultProps = {
        venueFilterText: '',
    }
    
    render() {
        return (
            <nav className="Sidebar">
                <h2 id="Sidebar-heading">Pub Locations</h2>
                <a href="https://www.foursquare.com" target="blank">
                    <img 
                        id="FoursquareLogoImage"
                        src={poweredByFoursquareImage} 
                        alt="Powered By Foursquare" 
                    />
                </a>
                <SidebarFilter 
                    filterText={this.props.venueFilterText}     
                    onChange={this.props.onVenueFilterChange}
                />
                <ul>
                    {this.props.venues.map(venue => (
                        <li id={`venue-${venue.id}`} tabIndex="0" role="Menuitem" aria-labelledby={`venue-${venue.id}-name Sidebar-heading`} key={venue.id} onClick={() => this.props.onVenueClick(venue.id)} className={this.props.selectedVenueId === venue.id ? 'selected' : ''}>
                            <label id={`venue-${venue.id}-name`}>{venue.name}</label>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}