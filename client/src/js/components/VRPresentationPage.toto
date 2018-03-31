import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {toggleTools} from '../action-creators/uiActionCreators'
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import 'aframe-htmltexture-component';

function createMarkup(html) {
    return {__html: html};
}

class VRPresentationPage extends React.Component {

    render() {
        return (
            <div id={'thepage'+this.props.currentPage}>
                <Scene>
                    <a-asset>
                        <div id="thePageTexture" dangerouslySetInnerHTML={createMarkup(this.props.html)}/>
                    </a-asset>
                    <Entity primitive='a-sky' src="/cmn/img/chess-world.jpg"/>
                </Scene>
            </div>)
    }
}

VRPresentationPage.propTypes = {
    name: PropTypes.string,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    title: PropTypes.string
};

export default VRPresentationPage;
