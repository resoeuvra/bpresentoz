import React from 'react';
import { connect } from 'react-redux';
import {Page, VRPage} from '../containers/Page';
import ToolsContainer from '../containers/ToolsContainer';
import PresentationsHome from '../containers/PresentationsHome';
import {MODES} from '../actions/presentationActions';


class App extends React.Component {
  render() {
    let isPresentationActive = this.props.presentationActive;
    if (!isPresentationActive) {
      return <div><PresentationsHome /></div>
    } else {
      return (this.props.presentationMode === MODES.VR) ? <div><VRPage /></div> : <div><Page /><ToolsContainer /></div>
    }
  }
}

const mapStateToProps = state => {
  // switch between the type of page and the type of component
  return {
    presentationActive: state.ui.active,
    presentationMode: state.ui.mode
  }
};



App = connect(mapStateToProps)(App);

export default App;
