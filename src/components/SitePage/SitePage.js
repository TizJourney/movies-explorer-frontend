import './SitePage.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SitePage(props) {
  return (
    <div className="page">
      <div className="page__content content">
        <Header/>
        {props.children}
        <Footer />
      </div>
    </div>
  )
}
