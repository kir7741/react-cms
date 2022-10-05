import React from 'react';
import classNames from 'classnames';
import Header from 'components/organisms/Header';
import Navigation from 'components/organisms/Navigation';
import Footer from 'components/organisms/Footer';

import { useRouting } from 'models/routing';
import { useNavigator } from 'models/navigator';

import styles from './index.css';

const App: React.FC = ({ children }) => {

	const [{ pathname }] = useRouting();
	const [{ isOpen }] = useNavigator();
	const isLogin = pathname === '/login';

	return (
		<section
			className={classNames(styles.container, {
				[styles.fullPage]: isLogin,
				[styles.slim]: !isOpen
			})}
		>
			{!isLogin &&
				<>
					<Header />
					<Navigation />
				</>
			}
			<div className={styles.content}>
				{children}
			</div>
			{ !isLogin && <Footer /> }
		</section>
	)
};

export default App;
