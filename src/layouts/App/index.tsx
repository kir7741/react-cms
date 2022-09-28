import React from 'react';
import classNames from 'classnames';
import Header from 'components/organisms/Header';
import Navigation from 'components/molecules/Navigation';
import Footer from 'components/organisms/Footer';
import { useRouting } from 'models/routing';

import styles from './index.css';

const App: React.FC = ({ children }) => {

	const [{ pathname }] = useRouting();
	const isLogin = pathname === '/login';

	return (
		<section
			className={classNames(styles.container, {
				[styles.fullPage]: isLogin,
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
