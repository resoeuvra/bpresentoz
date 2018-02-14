import {connect} from 'react-redux';
import HTMLPresentationPage from '../components/HTMLPresentationPage';
import {SHOW_TOOLS, HIDE_TOOLS} from "../actions/presentationActions";

const mapStateToProps = state => {
  // switch between the type of page and the type of component

  return {
    html: state.data.presentationData.pages[state.ui.pageShown].html,
    name: state.ui.name,
    title: state.ui.title,
    totalPages: state.ui.totalPages,
    currentPage: state.ui.pageShown,
    toolsShown: state.ui.showTools,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showTools: () => {dispatch({type: SHOW_TOOLS})},
    hideTools: () => {dispatch({type: HIDE_TOOLS})},
  }
};


const Page = connect(mapStateToProps, mapDispatchToProps)(HTMLPresentationPage);

export default Page;