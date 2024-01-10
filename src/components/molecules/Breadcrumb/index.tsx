import React from 'react';
import classnames from 'classnames';

import styles from './index.module.css';

export interface BreadcrumbType {
	id: string;
	name: string;
	href: string;
}

interface BreadcrumbProperty {
	className?: string;
	crumbs: BreadcrumbType[];
	seperator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProperty> = ({ className, crumbs = [], seperator = '/' }) => (
	<div className={classnames(styles.breadcrumb, className)}>
		{crumbs.map(({ id, name, href }) => (
			<>
				<a key={id} className={styles.link} href={href}>
					{name}
				</a>
				<span className={styles.seperator}>{seperator}</span>
			</>
		))}
	</div>
);

export default Breadcrumb;
