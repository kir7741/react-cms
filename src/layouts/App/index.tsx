import classNames from 'classnames';
import { useRouting } from 'models/routing';
import React from 'react';
import styles from './index.css';

const App: React.FC = ({ children }) => {

	const [
		{ pathname }
	] = useRouting();

	const isLogin = pathname === '/login';

	return (
		<>
			<section
				className={classNames(styles.container, {
					[styles.fullPage]: isLogin,
				})}
			>

				{ !isLogin ?
					<>
						<header className={styles.header}></header>
						<aside className={styles.side}>
							<div className={styles.logo}>CMSBOT</div>
						</aside>
					</> :
					null
				}

				<div className={styles.content}>
					{children}
				</div>
				{ !isLogin ? <footer className={styles.footer}></footer> : null }

			</section>

		</>
	)
};

export default App;
