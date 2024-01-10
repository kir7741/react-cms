import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from 'models/modal';
import Dialog from 'components/molecules/Dialog';

const DialogPage: React.FC = () => {
	const [, { openModal }] = useModal();
	const [uuId] = useState(uuidv4());

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={() => {
					openModal({
						message: 'messageTest',
						uuId,
					});
				}}
			>
				click me!
			</div>
			<Dialog uuId={uuId} />
		</>
	);
};

export default DialogPage;
