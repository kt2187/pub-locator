import { HTTP } from '../util';
import { foursquare as config } from '../config/config.js';

export default class FoursquareService {

    static async getRecommendedVenues(query, near) {
        const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
        const parameters = {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            query,
            near,
            v: config.apiVersion,
        };

        return HTTP.request(endPoint + new URLSearchParams(parameters))
            .then(response => response.json().then(body => {
                return body.response.groups.find(group => group.name === 'recommended').items.map(item => item.venue);
            }))
            .catch(error => {
                console.error('Foursquare error:', error);
                return Promise.reject(error);
            });
    }

    static async getVenueDetails(venueId) {
        const endPoint = `https://api.foursquare.com/v2/venues/${venueId}?`;
        const parameters = {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            v: config.apiVersion,
        };

        return HTTP.request(endPoint + new URLSearchParams(parameters))
            .then(response => response.json().then(body => {
                return body.response.venue;
            }))
            .catch(error => {
                console.error('Foursquare error:', error);
                return Promise.reject(error);
            });
    }
}