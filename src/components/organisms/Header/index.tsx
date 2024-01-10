import React from 'react';

import Breadcrumb from 'components/molecules/Breadcrumb';

import { useNavigator } from 'models/navigator';

import Menu from 'images/icon/menu.inline.svg';

import styles from './index.module.css';

const Header: React.FC = () => {

	const [, { toggleNav }] = useNavigator();

	return (
		<header className={styles.header}>
			<button
				type="button"
				className={styles.menuToggle}
				onKeyPress={() => {}}
				onClick={toggleNav}
			>
				<Menu />
			</button>
			<Breadcrumb crumbs={[
				{ id: 'home', name: 'Home', href: '/' },
				{ id: 'about', name: 'About', href: '/about' },
				{ id: 'contact', name: 'Contact', href: '/contact' },
			]} />
		</header>
	);
};

export default Header;
