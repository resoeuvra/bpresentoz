import React from 'react';

const Tools = pageState => (
  <footer id="pres-footer" className={!pageState.showTools ? 'hide_menu' : ''}>
    <p className="disclaimer" role="contentinfo">&copy;2018 Résoeuvra inc., (<a href="http://creativecommons.org/licenses/by-sa/2.5/ca/deed.fr_CA">CC BY-SA</a> ou documentation GPL).   <br />
      Logos HTML5 &copy;W3C (<a href="http://creativecommons.org/licenses/by/3.0/" hrefLang="en">CC BY 3.0</a>)</p>
    <div id="tools">
      <ul>
        <li style={{display: pageState.currentPage==(pageState.totalPages-1) ? 'none' : 'block'}}><a id="navSuivJs" className="navJs" style={{diplay: pageState.currentPage==pageState.totalPages ? 'none' : 'block'}} href={'#/' + pageState.name + '/' + (pageState.currentPage + 1)}>Page suivante&gt;&gt;</a></li>
        <li style={{display: pageState.currentPage==0 ? 'none' : 'block'}}><a id="navPrecJs" className="navJs" style={{diplay: pageState.currentPage==0 ? 'none' : 'block'}} href={'#/' + pageState.name + '/' + (pageState.currentPage - 1)}>&lt;&lt;Page précédente</a></li>
        <li><a id="navTabJs" className="navJs"  href={'#/' + pageState.name + '/0'}>&gt;Table des matières &lt;</a></li>
      </ul>
      <div id="noPageJs" className="navJs">{pageState.currentPage + 1} de {pageState.totalPages}</div>
      <div className="commandite">
        <img className="logo-commandite" src="/cmn/img/resoeuvra.png" alt="Présenté par Résoeuvra" />
      </div>
      <canvas id="pointer" width="100" height="100">
      </canvas>
    </div>
  </footer>
);

export default Tools;



