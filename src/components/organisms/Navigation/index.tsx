import React from 'react';
import classnames from 'classnames';

import NavMenuItem from 'components/molecules/NavMenuItem';

import { useNavigator } from 'models/navigator';

import styles from './index.module.css';


const Navigation: React.FC = () => {

	const [{ isOpen, menuList }] = useNavigator();

	return (
		<nav className={styles.navigation}>
			<div className={classnames(styles.logo)}>
				{ isOpen ? 'CMSBOT' : 'C' }
			</div>
			<section className={classnames(!isOpen && styles.hide)}>
				{
					menuList.map(menu => <NavMenuItem menu={menu} key={menu.id}/>)
				}
			</section>
		</nav>
	);
};

export default Navigation;
