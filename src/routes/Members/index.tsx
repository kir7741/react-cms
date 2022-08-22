import React from 'react';
import { getMembers, cleanMembers } from 'models/member';
import { CustomRoute } from 'util/hook/useRouter';

export const sleep = (time: number): Promise<undefined> =>
	new Promise(resolve => setTimeout(() => resolve(), time));

const routes: CustomRoute = {
	path: '/members',
	components: () => [import(/* webpackChunkName: 'members' */ './component')],
	render: ([Members]) => <Members />,
	onEnter: async ({ store }) => {
		console.log('on Enter member');
		await store.dispatch(cleanMembers());
		await store.dispatch(getMembers());
		console.log('on Enter member / end');
		await sleep(5000);
	},
};
export default routes;
