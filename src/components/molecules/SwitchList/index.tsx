import React from 'react';

import ToggleButton from 'components/atoms/ToggleButton';
import List, { Item } from 'components/atoms/List';

interface SwitchListProperty {
	onClose: () => void;
	onOpen: () => void;
	items: Item[];
}

const SwitchList: React.FC<SwitchListProperty> = ({ onOpen, onClose, items }) => (
	<div>
		<ToggleButton onOpen={onOpen} onClose={onClose} />
		<List items={items} />
	</div>
);

export default SwitchList;
