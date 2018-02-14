import React from 'react';
import PropTypes from 'prop-types';
import {toggleTools} from '../action-creators/uiActionCreators';

function createMarkup(html) {
  return {__html: html};
}

class HTMLPresentationPage extends React.Component {

  next() {
    this.props.currentPage < this.props.totalPages ? window.location.hash = '/' + this.props.name + '/' + (this.props.currentPage + 1) : null
  }

  previous() {
    this.props.currentPage > 0 ? window.location.hash = '/' + this.props.name + '/' + (this.props.currentPage - 1) : null
  }

  tableOfContents() {
    window.location.hash = '/' + this.props.name + '/0';
  }

  keyEvent(e) {
    if (e.which===32) this.next();
    else if (e.which===37 || e.which===33) this.previous();
    else if (e.which===39 || e.which===34) this.next();
    else if (e.which===38) this.tableOfContents();
    else if (e.which===66) toggleTools(this.props.toolsShown,this.props.showTools, this.props.hideTools);
  }

  constructor() {
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


  touchMove(event) {
    const touch = event.targetTouches[0];

    if (event.targetTouches.length>1) {
      this.touches = 2;
    }
    this.pointer.style.display = "block";
    this.pointer.style.top = touch.pageY +"px";
    this.pointer.style.left = touch.pageX +"px";
    event.preventDefault();
  }

  touchStart(event) {
    const touch = event.targetTouches[0];

    this.timeStart = new Date().getTime();
    if (event.targetTouches.length>1) {
      this.touches = 2;
    }
    this.lastPositionMove = touch.pageX;
    event.preventDefault();
  }

  touchEnd(event) {
    this.pointer.style.display = "none";
    const touch = event.changedTouches[0];
    const now = new Date().getTime();
    if (this.timeStart!==null) {
      if (now - this.timeStart < 400) {
        if (this.lastPositionMove +100 < touch.pageX ) {
          this.touches = 0;
          this.previous();
        }
        if (this.lastPositionMove > touch.pageX + 100)  {
          this.touches = 0;
          this.next();
        }
      }
    }
    this.timeStart = null;
  }

  setupTouchEvents() {
    this.specificTouchMoveEvent= this.touchMove.bind(this);
    this.pageElement.addEventListener('touchmove', this.specificTouchMoveEvent);
    this.specificTouchStartEvent= this.touchStart.bind(this);
    this.pageElement.addEventListener('touchstart', this.specificTouchStartEvent);
    this.specificTouchEndEvent= this.touchEnd.bind(this);
    this.pageElement.addEventListener('touchend', this.specificTouchEndEvent);
  }


  setupPointer() {
      const canvasCtx = document.getElementById("pointer").getContext("2d");
      canvasCtx.fillStyle = "rgb(0,0,0)";
      canvasCtx.strokeStyle = "rgb(0,0,0)";
      canvasCtx.lineWidth = 5;
      canvasCtx.beginPath();
      canvasCtx.moveTo(3, 3);
      canvasCtx.lineTo(30, 3);
      canvasCtx.moveTo(3, 3);
      canvasCtx.lineTo(3, 30);
      canvasCtx.moveTo(0, 0);
      canvasCtx.lineTo(35, 35);
      canvasCtx.stroke();
  }


  componentDidMount() {
    // change document title
    let pageShown = this.props.currentPage + 1;
    document.title = this.props.title + ' - page ' + pageShown;
    this.specificKeyEvent = this.keyEvent.bind(this);
    // setup listeners (keyboard, touch)
    window.addEventListener('keyup', this.specificKeyEvent);
    // setup pointer for touch screens
    this.setupPointer();
    this.pointer= document.getElementById('pointer');
    this.pageElement= document.getElementById('thepage' + this.props.currentPage);
    // setup touch events
    this.setupTouchEvents();
    // setup gameloop
    this.gameLoop(this);
  }

  componentWillUnMount() {
    document.title = '';
    // remove document title
    // remove listeners
    window.removeEventListener('keyup', this.specificKeyEvent);
    this.pageElement.removeEventListener('touchmove', this.specificTouchMoveEvent);
    this.pageElement.removeEventListener('touchstart', this.specificTouchStartEvent);
    this.pageElement.removeEventListener('touchend', this.specificTouchEndEvent);
    // stop gameloop
    if (this.startGameLoop!==null) {
      window.cancelAnimationFrame(this.startGameLoop);
    }

  }

  render() {
    return <div id={'thepage'+this.props.currentPage}><div dangerouslySetInnerHTML={createMarkup(this.props.html)}/><canvas id="pointer"> </canvas></div>
  }
}

HTMLPresentationPage.propTypes = {
  name: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  title: PropTypes.string
};

export default HTMLPresentationPage;