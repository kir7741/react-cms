import React from 'react';
import Link from 'components/atoms/Link';

import styles from './index.css';

const Navigation: React.FC = () => (
	<nav className={styles.navigation}>
		<div className={styles.logo}>CMSBOT</div>
		{/* <ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/members">Members</Link>
			</li>
			<li>
				<Link to="/blogs">Blogs</Link>
			</li>
		</ul> */}
	</nav>
);

export default Navigation;
