import React from 'react';

function createMarkup(html) {
  return {__html: html};
}

const HTMLPresentationPage = state => {
  return <div dangerouslySetInnerHTML={createMarkup(state.html)}/>
};

export default HTMLPresentationPage;