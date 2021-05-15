import './SitePage.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SitePage(props) {
  return (
    <div className="page">
      <div className="content">
        <Header/>
        {props.children}
        <Footer />
      </div>
    </div>
  )
}
