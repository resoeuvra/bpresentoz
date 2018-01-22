import {connect} from 'react-redux';
import HTMLPresentationPage from '../components/HTMLPresentationPage';

const mapStateToProps = state => {
  // switch between the type of page and the type of component
  console.log(state);
  console.log(state.presentationData.pages[state.presentationCurrentPage].html);
  return {
    html: state.presentationData.pages[state.presentationCurrentPage].html
  }
};

const Page = connect(mapStateToProps)(HTMLPresentationPage);

export default Page;