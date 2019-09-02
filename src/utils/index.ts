import chalk from 'chalk';

import LogLevel, {LevelColors} from "../LogLevel";

export const getColorScheme = (category: LogLevel) => LevelColors[category];

export const boldify = (content: string) => chalk.bold(content);

export const whitefy = (content: string) => chalk.whiteBright(content);

export const grayfy = (content: string) => chalk.gray(content);

export const stripColors = (str: string) => str.replace(/\x1B\[\d+m/g, '');

export const colorizeLog = (content: string, colorScheme: string) => {
  return chalk[colorScheme](content);
};

