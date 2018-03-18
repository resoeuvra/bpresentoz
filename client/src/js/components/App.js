import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Page from '../containers/Page';
import ToolsContainer from '../containers/ToolsContainer';
import PresentationsHome from '../containers/PresentationsHome';


class App extends React.Component {
  render() {
    let isPresentationActive = this.props.presentationActive;
    if (!isPresentationActive) {
      return <div><PresentationsHome /></div>
    } else {
      return <div><Page /><ToolsContainer /></div>
    }
  }
}

const mapStateToProps = state => {
  // switch between the type of page and the type of component
  return {
    presentationActive: state.ui.active
  }
};



App = connect(mapStateToProps)(App);

export default App;
