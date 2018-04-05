import {connect} from 'react-redux';
import PresentationList from '../components/PresentationList';

const mapStateToProps = state => {
    return {
      presentations: state.data.presentationList
    }
};

const PresentationsHome = connect(mapStateToProps)(PresentationList);

export default PresentationsHome;