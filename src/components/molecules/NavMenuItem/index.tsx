import React, { useState } from 'react';
import classnames from 'classnames';

import Link from 'components/atoms/Link';

import { Menu } from 'types/interfaces/menu';

import styles from './index.module.css';

interface NavMenuItemProperty {
	menu: Menu;
	className?: string;
}

const NavMenuItem: React.FC<NavMenuItemProperty> = ({ menu, className }) => {

	const [isOpen, setIsOpen ] = useState(false);

	if (!menu) {
		return null;
	}

	return (
		<div className={classnames(styles.navMenuItem, className)}>
			{
				menu.path ?
					<Link className={styles.menuLink} to={menu.path}>
						{ menu.name }
					</Link> :
					<div
						role="button"
						tabIndex={0}
						className={styles.menuLink}
						onKeyPress={() => {}}
						onClick={() => setIsOpen(pre => !pre)}
					>
						{ menu.name }
					</div>
			}
			<div className={classnames(styles.subMenu, {
				[styles.hide]: !isOpen
			})}>
				{
					menu.subMenus.map(subMenu =>
						<div
							className={styles.navMenuItem}
							key={subMenu.id}
						>
							<NavMenuItem menu={subMenu}/>
						</div>
					)
				}
			</div>
		</div>
	);
};

export default NavMenuItem;

