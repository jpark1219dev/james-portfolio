import React from 'react';
import Head from 'next/head';

import Panel from '../shared/Panel';
import Navigation from '../shared/Navigation';
import Footer from '../shared/Footer';

const BaseLayout = props => {
	const { panelType, headerType, mainClass, footerType, title, cannonical, children } = props;

	return (
		<React.Fragment>
			<Head>
				<title>{title}</title>
				<meta name="description" content="My name is James Park and I am an experienced software engineer" />
				<meta name="keywords" content="james portfolio, james developer, james freelancing, james programming" />
				<meta property="og:title" content="James Park - programmer, developer, blogger" />
				<meta property="og:url" content={`${process.env.BASE_URL}`} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content="My name is James Park and I am an experienced software engineering" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
				{cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`} />}
				{/* <link rel="icon" type="image/ico" href="/favicon.ico" /> */}
			</Head>
			<div className="container">
				<Panel className={`panel-${panelType}`} />
				<Navigation className={`nav-${headerType}`} />
				<main className={`main-${mainClass}`}>
					{children}
				</main>
			</div>
			<Footer className={`footer-${footerType}`} />
		</React.Fragment>
	)
}

BaseLayout.defaultProps = {
	panelType: 'default',
	headerType: 'default',
	mainClass: 'default',
	footerType: 'default',
	title: 'James Park - Portfolio',
	cannonical: false
}

export default BaseLayout;
