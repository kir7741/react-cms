import React from 'react';
import classNames from 'classnames';
import Header from 'components/organisms/Header';
import Navigation from 'components/organisms/Navigation';
import Footer from 'components/organisms/Footer';

import { useRouting } from 'models/routing';
import { useNavigator } from 'models/navigator';
import Modal from 'components/molecules/Modal';
import { useModal } from '../../models/modal';
import styles from './index.css';

const App: React.FC = ({ children }) => {

	const [{ pathname }] = useRouting();
	const [{ isOpen }] = useNavigator();
	const [{ modalList } ] = useModal();
	const isLogin = pathname === '/login';

	return (
		<>
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
			{/* TODO: 待尋找更好的方法 */}
			{/* {
				modalList.map((item, index) =>
				{
					const a = index;
					return (
						<Modal
							uuId={item.uuId}
							key={`${item.uuId}${a}`}
						/>
					)
				})
			} */}

		</>
	)
};

export default App;
