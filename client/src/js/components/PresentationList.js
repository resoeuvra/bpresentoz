import React from 'react';
import PresentationLink from './PresentationLink';

const PresentationList = ({presentations}) => {

  if (presentations !== null) {
    return (
     <article className="presentationList">
       <ul>
         {
           presentations.presentations.map(presentation => (
             <PresentationLink {...presentation} />
           ))
         }
       </ul>
     </article>
    )
  } else {
    return <p>Aucune présentation disponible</p>
  }
};
/*


 */
export default PresentationList;