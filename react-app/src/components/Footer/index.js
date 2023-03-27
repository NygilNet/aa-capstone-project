import React from "react";
import "./index.css";

function Footer() {

    return (
        <footer>
            <div className="footer-left">
                <p>MindPalace is an Evernote clone made by Nygil Nettles</p>
            </div>
            <div className="footer-right">
                <ul className="footer-links">
                    <li><a href="https://github.com/NygilNet" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/nygil-nettles-5168a624b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="https://github.com/NygilNet/aa-capstone-project" target="_blank" rel="noopener noreferrer">Project Repo</a></li>
                </ul>
            </div>
        </footer>
    )

}

export default Footer;
