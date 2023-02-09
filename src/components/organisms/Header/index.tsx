import React from 'react';
import Menu from 'images/icon/menu.inline.svg';

import { useNavigator } from 'models/navigator';

import styles from './index.module.css';

const Header: React.FC = () => {

	const [, { toggleNav }] = useNavigator();

	return (
		<header className={styles.header}>
			<div
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={toggleNav}
			>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
