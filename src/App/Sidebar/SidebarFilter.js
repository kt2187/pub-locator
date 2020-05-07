import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SidebarFilter extends Component {

    static propTypes = {
        filterText: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    }
    
    static defaultProps = {
        filterText: '',
    }

    handleChange = event => {
        this.props.onChange(event.target.value);
    }
    
    render() {
        return (
            <form role="search" className="SidebarFilter">
                <label htmlFor="sidebar-filter">Filter: </label>
                <input 
                  name="sidebar-filter" 
                  type="search" 
                  aria-label="Filter list of pub locations"  
                  value={this.props.filterText} 
                  onChange={this.handleChange} 
                  />
            </form>
        );
    }
}       