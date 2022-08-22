import React from 'react';

import { getBlogs } from 'models/blog';

import { CustomRoute } from 'util/hook/useRouter';

const routes: CustomRoute = {
	path: '/blogs',
	components: () => [import(/* webpackChunkName: 'blogs' */ './component')],
	render: ([Blogs]) => <Blogs />,
	onEnter: async ({ store }) => {
		console.log('on Enter blog');
		await store.dispatch(getBlogs());
		console.log('on Enter blog / end');
	},
};

export default routes;
