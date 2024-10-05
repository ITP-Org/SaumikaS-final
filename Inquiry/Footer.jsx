import './Footer.css';

function Footer() {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                    
                        <div className="footer-col">
                            <h4>About us</h4>
                            <ul>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Courses</h4>
                            <ul>
                                <li><a href="#">Past Papers</a></li>
                                <li><a href="#">Lectures</a></li>
                                <li><a href="#">Revision</a></li>
                                <li><a href="#">Tutes</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Forum</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="copy-rights">
                        <a href="#">2024 &copy;Saumika Senanayake</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
