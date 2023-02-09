import React from 'react';

import PageLayout from 'layouts/Page';

import { useHistory } from 'models/routing';

const PageContent: React.FC = () => {
	const history = useHistory();

	return (
		<div>
			<div role="button" tabIndex={0} onClick={() => history.back()} onKeyPress={() => {}}>
				{'< go back'}
			</div>
		</div>
	);
};

const Blogs = PageLayout({
	PageHeader: "Blogs's page",
	PageContent,
});

Blogs.displayName = 'Blogs';

export default Blogs;
