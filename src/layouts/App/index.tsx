import React from 'react';
import styles from './index.css';

const App: React.FC = ({ children }) => (
	<div className={styles.wrapper}>
		{children}
	</div>
);

export default App;
