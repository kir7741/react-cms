import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';

import MemberList from 'components/molecules/MemberList';

export default {
	title: 'molecules/MemberList',
	component: MemberList,
} as ComponentMeta<typeof MemberList>;

export const Interactive: ComponentStoryObj<typeof MemberList> = {
	parameters: {
		// Mock redux data
		redux: {
			data: {
				members: {
					loading: false,
					staffs: {
						Jessy: {
							no: '19',
							name: 'Lee',
							fullname: 'Lee',
							nickname: 'Lee',
							type: 'Official',
							OnBoardDate: '2022/01/01',
							email: 'example@25sprout.com',
							github: '',
							website: '',
							sexual: 'Male',
							birthday: '1900/01/01',
							pic: {
								small: '',
								large: '',
							},
							title: ['Front-End Developer'],
						},
					},
				},
			},
		},
	},
};
