import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface DashboardProperty { }

const Dashboard: React.FC<DashboardProperty> = ({ className }) => (
	<div className={classnames(styles.dashboard, className)}>Dashboard</div>
);

export default Dashboard;
