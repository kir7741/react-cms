import React from 'react';

import ToggleButton from 'components/atoms/ToggleButton';
import List from 'components/atoms/List';

import { useMember } from 'models/member';

const MemberList: React.FC = () => {
	const [{ members }, { getMembers, cleanMembers }] = useMember();

	return (
		<div>
			<ToggleButton onOpen={getMembers} onClose={cleanMembers} />
			<List items={Object.keys(members).map(key => ({ key, value: members[key].name }))} />
		</div>
	);
};

export default MemberList;
