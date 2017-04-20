import React, { PropTypes } from 'react';
import Header from './shared/Header';

/**
 * The App component for the project.
 */
class App extends React.Component {
  render () {
    return (
      <div>
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
  children: PropTypes.element
};

export default App;
