import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search, clearSearch, toggleFavourite, selectStock } from '../../../actions/sidebar';
import searchTabImage from '../../../assets/png/search_tab.png';
import SearchResult from '../../../components/SearchResult.js';

class Search extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
        this.clear = this.clear.bind(this);
    }

    onChange(e) {
        const query = e.target.value;
        this.props.dispatch(search(query));
    }

    onIconClick(stock) {
        this.props.dispatch(toggleFavourite(stock.code, stock));
    }

    onClick(stock) {
        this.props.dispatch(selectStock(stock.code, stock.name));
    }

    onDrag() {
        // TODO: send content to tearout
        // Can we actually drag a search?
    }

    clear() {
        this.props.dispatch(clearSearch());
    }

    render() {
        const { isSearching, hasErrors, results, term } = this.props;

        let bindings = {
            onClick: this.onClick,
            onIconClick: this.onIconClick,
            onDrag: this.onDrag
        };
        return (
            <div>
                <div>
                    <img className="top-icon" src={searchTabImage} title="Search Stocks" draggable="false" />
                    <input value={term} className="sidetab hiddenOnContracted" type="text" maxLength="20" placeholder="Enter stock name or symbol" onChange={this.onChange} />
                    <div className="icon close hiddenOnContracted" title="Close Search" onClick={this.clear}>&nbsp;</div>
                </div>
                <div id="search-scroll" className="side-scroll custom-scrollbar">
                    <div className="sidetab hiddenOnContracted">
                        {hasErrors && <div className="results-message">
                            An error occurred while retrieving data. Please check your internet connection or wait for our data services to be re-established.
                        </div>
}
                        {isSearching && <div className="loading-message results-message">Loading search results...</div>}

                        {(results || []).map(stock => <SearchResult key={stock.code} stock={stock} bindings={bindings} />)}
                        {results && results.length === 0 && !hasErrors && !isSearching && <div className="results-message no-results">
                            Oops!<br />
                            Looks like no matches were found.
                        </div>
}
                    </div>
                </div>
            </div>
        );
    }
}
Search.propTypes = {
    isSearching: PropTypes.bool,
    hasErrors: PropTypes.bool,
    results: PropTypes.array,
    term: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { isSearching, hasErrors, results, term } = state && state.search;
    return { isSearching, hasErrors, results, term };
}

export default connect(mapStateToProps)(Search);