import React from "react";
import "./index.css";

function Footer() {

    return (
        <footer>
            <div className="footer-left">
                <p className="footer-copyright">MindPalace is an Evernote clone made by Nygil Nettles</p>
            </div>
            <div className="footer-right">
                <ul className="footer-links">
                    <li><i class="fa-brands fa-github" style={{color: "#ffffff"}}></i> <a href="https://github.com/NygilNet" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><i class="fa-brands fa-linkedin" style={{color: "#ffffff"}}></i> <a href="https://www.linkedin.com/in/nygil-nettles-dev/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><i class="fa-solid fa-book-bookmark" style={{color: "#ffffff"}}></i> <a href="https://github.com/NygilNet/aa-capstone-project" target="_blank" rel="noopener noreferrer">Project Repo</a></li>
                </ul>
            </div>
        </footer>
    )

}

export default Footer;
