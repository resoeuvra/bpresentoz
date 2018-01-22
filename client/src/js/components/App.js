import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { helloSaga } from '../sagas/uiSagas';
import Page from '../containers/Page';
import PresentationsHome from '../containers/PresentationsHome';

class App extends React.Component {
  render() {
    console.log(this.props);
    let isPresentationActive = (this.props.currentPresentationName !== null);
    if (!isPresentationActive) {
      return <div>Liste:<PresentationsHome /></div>
    } else {
      return <div>Page: <Page /></div>
    }
  }
}

const mapStateToProps = state => {
  // switch between the type of page and the type of component
  return {
    currentPresentationName: state.currentPresentationName
  }
};

App = connect(mapStateToProps)(App);

export default App;
