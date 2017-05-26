import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './shared/Header';
import Loader from './shared/Loader';

/**
 * The App component for the project.
 */
class App extends React.Component {
  render () {
    let loading = false;
    if (this.props.webSocketLoading || this.props.puzzleLoading) {
      loading = true;
    }

    return (
      <div>
        {loading &&
          <Loader />
        }
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  /**
   * The child elements of the app.
   */
  children: PropTypes.element,
  /**
   * A boolean indicating whether the websocket connection is loaded or not.
   */
  webSocketLoading: PropTypes.bool,
  /**
   * A boolean indicating whether the puzzle is loaded or not.
   */
  puzzleLoading: PropTypes.bool
};

function mapStateToProps (state) {
  return {
    webSocketLoading: state.webSocket.loading,
    puzzleLoading: state.puzzle.loading
  };
}

export default connect(mapStateToProps, null)(App);
