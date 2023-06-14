import React from "react";
import { Link } from "react-router-dom";

import styles from '../../styles/Footer.module.css';

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";

const Footer = () => {
    return (
        <section className={styles.footer}>
             <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="logo"/>
                </Link>
            </div>

            <div className={styles.rights}>
                Developed by Maryia Furs
            </div>

            <div className={styles.socials}>
                <a href="https://www.instagram.com/m.furs/" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}/>
                    </svg>
                </a>

                <a href="https://www.facebook.com/people/%D0%9C%D0%B0%D1%80%D0%B8%D1%8F-%D0%A4%D1%83%D1%80%D1%81/pfbid037G54oVAdbB4M8F9RNkDPPzsQfofND551M7hXH2bbTyAWYkdYVyxuPwerSTWB1i1il/" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}/>
                    </svg>
                </a>

                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}/>
                    </svg>
                </a>
            </div>

        </section>
    )
};

export default Footer;