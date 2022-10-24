import { v4 as uuidv4 } from 'uuid';

export const fakeOptions = [
	{
		id: '',
		name: '請選擇'
	},
	{
		id: uuidv4(),
		name: '選項一'
	},
	{
		id: uuidv4(),
		name: '選項二'
	},
	{
		id: uuidv4(),
		name: '選項三'
	},
	{
		id: uuidv4(),
		name: '選項四'
	}
];
