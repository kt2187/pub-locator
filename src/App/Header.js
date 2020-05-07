import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    
    static propTypes = {
        onSidebarToggle: PropTypes.func,
        sidebarVisible: PropTypes.bool,
    }

    static defaultProps = {
        sidebarVisible: true,
    }

    handleSidebarToggle = () => {
        if (this.props.onSidebarToggle) {
            this.props.onSidebarToggle();
        }
    }

    render() {
        return (
            <div role="application" className='Header'>
                <button
                    id="sidebarToggle"
                    aria-expanded={this.props.sidebarVisible}
                    aria-pressed={!this.props.sidebarVisible}
                    onClick={this.handleSidebarToggle}
                >
                    {this.props.sidebarVisible ? 'Hide' : 'Show'} Sidebar
                </button>
            </div>
        );
    }
}