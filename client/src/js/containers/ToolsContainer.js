import {connect} from 'react-redux';
import Tools from '../components/Tools';

const mapStateToProps = state => {
  // send the page number
  return {
    currentPage: state.ui.pageShown,
    name: state.ui.name,
    totalPages: state.ui.totalPages,
    showTools: state.ui.showTools,
  }
};

const ToolsContainer = connect(mapStateToProps)(Tools);

export default ToolsContainer;