import React from 'react';

const PresentationLink = name => (
  <li><a href={'#/' + name.name}>{name.name}</a></li>
);

export default PresentationLink;