import React from 'react';
import Link from 'components/atoms/Link';
import { useNavigator } from 'models/navigator';

import classnames from 'classnames';

import styles from './index.css';

const Navigation: React.FC = () => {

	const [{ isOpen, menuList }] = useNavigator();

	return (
		<nav className={styles.navigation}>
			<div className={classnames(styles.logo)}>
				{ isOpen ? 'CMSBOT' : 'C' }
			</div>
			<ul>
				{
					menuList.map(menu => (
						<Link to={menu.path} key={menu.id}>{menu.name}</Link>
					))
				}
			</ul>
		</nav>
	);
};

export default Navigation;
