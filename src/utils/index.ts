import chalk from 'chalk';

export const getColorScheme = (category: string) => {
	const colors = {
		I: 'green',
		D: 'magenta',
		W: 'yellow',
		E: 'red'
	};

	return colors[category];
};

export const colorizeLog = (content: String, colorScheme: string) => {
	return chalk[colorScheme](content);
};
