import React from 'react';
import Link from 'components/atoms/Link';
import { useNavigator } from 'models/navigator';

import classnames from 'classnames';
import { Menu } from 'types/interfaces/menu';
import styles from './index.css';

const Navigation: React.FC = () => {

	const [{ isOpen, menuList }] = useNavigator();

	const menuLooping = (list: Menu[]) => {
		if (!Array.isArray(list)) {
			return null;
		}

		return list.map(m => (
			<div
				key={m.id}
				className={styles.menuItem}
			>
				<Link
					to=''
					onClick={() => {
						if (m.subMenus.length) {
							// TODO: 展開
						}
					}}
				>
					{ m.name }
				</Link>
				{ m.subMenus.length > 0 && <div className={styles.subMenu}>{menuLooping(m.subMenus)}</div> }
			</div>
		));

	}

	return (
		<nav className={styles.navigation}>
			<div className={classnames(styles.logo)}>
				{ isOpen ? 'CMSBOT' : 'C' }
			</div>
			<section>{ menuLooping(menuList) }</section>
		</nav>
	);
};

export default Navigation;
