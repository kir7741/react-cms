import { useState, useEffect } from 'react';

import { History, Location } from 'history';

const useLocation = (history: History): Location<History.PoorMansUnknown> => {
	const [location, setLocation] = useState(history.location);

	useEffect(() => {
		const unlisten = history.listen(l => setLocation(l));
		return () => unlisten();
	}, [history]);

	return location;
};

export default useLocation;
