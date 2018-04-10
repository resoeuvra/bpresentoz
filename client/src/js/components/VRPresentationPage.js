import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {toggleTools} from '../action-creators/uiActionCreators'
import AFRAME from 'aframe';
import {Entity, Scene} from 'aframe-react';
import textureComponent from 'aframe-htmltexture-component';
import drawComponent from 'aframe-draw-component';

function createMarkup(html) {
    return {__html: html};
}

class VRPresentationPage extends React.Component {

    next() {
        this.props.currentPage < this.props.totalPages ? window.location.hash = '/' + this.props.name + '.VR/' + (this.props.currentPage + 1) : null
    }

    previous() {
        this.props.currentPage > 0 ? window.location.hash = '/' + this.props.name + '.VR/' + (this.props.currentPage - 1) : null
    }

    tableOfContents() {
        window.location.hash = '/' + this.props.name + '.VR/0';
    }

    keyEvent(e) {
        if (e.which===32) this.next();
        else if (e.which===37 || e.which===33) this.previous();
        else if (e.which===39 || e.which===34) this.next();
        else if (e.which===38) this.tableOfContents();
        else if (e.which===66) toggleTools(this.props.toolsShown,this.props.showTools, this.props.hideTools);
    }

    constructor() {
        try {
            AFRAME.registerComponent("draw", drawComponent.component);
        } catch (error) {
            console.log(error);
        }

        super();
        this.startGameLoop = null
        this.lastButtonState = 0;
        this.lastLeftState = 0;
        this.lastRightState = 0;
        this.touches = 0;
        this.lastPositionMove = 0;
        this.lastPositionToDrawX = -1;
        this.lastPositionToDrawY = -1;
        this.timeStart = null;
    }




    gameLoop(me) {
        if (window.requestAnimationFrame && navigator.getGamepads) {
            const gp = navigator.getGamepads()[0];
            if (gp !== null && typeof(gp) !== 'undefined') {
                if(gp.buttons[0].value > 0 || gp.buttons[0].pressed === true) {
                    if (this.lastButtonState === 0) {
                        this.next();
                        this.lastButtonState = 1;
                    }
                } else {
                    this.lastButtonState = 0;
                }
                if (gp.axes[0]===1) {
                    console.log("0 1");
                    if (this.lastRightState === 0) {
                        this.next();
                        this.lastRightState = 1;
                    }
                } else {
                    this.lastRightState = 0;
                }

                if (gp.axes[0]===-1) {
                    console.log("0 -1");
                    if (this.lastLeftState === 0) {
                        this.previous();
                        this.lastLeftState = 1;
                    }
                } else {
                    this.lastLeftState = 0;
                }

                if (gp.axes[1]===1) {console.log("1 1");}
                if (gp.axes[1]===-1) {console.log("1 -1");}
            }
            this.startGameLoop = window.requestAnimationFrame(function() {
                me.gameLoop(me)
            });
        }
    }

  touchStart(event) {
    (this.props.currentPage < (this.props.totalPages-1)) ? this.next() : this.tableOfContents();
  }

    setupTouchEvents() {
      this.specificTouchStartEvent= this.touchStart.bind(this);
      this.pageElement.addEventListener('touchstart', this.specificTouchStartEvent);
    }


    componentDidMount() {
        // change document title
        let pageShown = this.props.currentPage + 1;
        document.title = this.props.title + ' - page ' + pageShown;
        this.specificKeyEvent = this.keyEvent.bind(this);
        // setup listeners (keyboard, touch)
        window.addEventListener('keyup', this.specificKeyEvent);
        this.pageElement= document.getElementById('thepage' + this.props.currentPage);
        this.setupTouchEvents();
        // setup gameloop
        this.gameLoop(this);
    }

    componentWillUnMount() {
        document.title = '';
        // remove document title
        // remove listeners
        window.removeEventListener('keyup', this.specificKeyEvent);
        this.pageElement.removeEventListener('touchstart', this.specificTouchStartEvent);
        // stop gameloop
        if (this.startGameLoop!==null) {
            window.cancelAnimationFrame(this.startGameLoop);
        }

    }

    render() {
        return (
            <div id={'thepage'+this.props.currentPage}>
                <Scene>
                    <a-asset>
                        <div style={{display:'none'}}>
                            <div id="thePageTexture" className="VR" dangerouslySetInnerHTML={createMarkup(this.props.html)}/>
                        </div>
                    </a-asset>
                    <a-plane position="0 0 -350" rotation="0 0 0" width="512" height="512" draw="width:1024; height:1024" color="#7BC8A4" htmltexture="asset: #thePageTexture"></a-plane>
                    <a-sky src="/cmn/img/chess-world.jpg"></a-sky>
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
