import React from 'react';
import PresentationLink from './PresentationLink';

const PresentationList = ({presentations}) => {
  console.log("liste");

  if (presentations !== null) {
    console.log(presentations.presentations);
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