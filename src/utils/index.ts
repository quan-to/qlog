import chalk from 'chalk';

import LogLevel from "../LogLevel";

export const getColorScheme = (category: LogLevel) => {
  const colors = {};

  colors[LogLevel.INFO] = 'green';
  colors[LogLevel.DEBUG] = 'magenta';
  colors[LogLevel.WARN] = 'yellow';
  colors[LogLevel.ERROR] = 'red';

  return colors[category];
};

export const boldify = (content: string) => chalk.bold(content);

export const whitefy = (content: string) => chalk.whiteBright(content);

export const grayfy = (content: string) => chalk.gray(content);

export const stripColors = (str: string) => str.replace(/\x1B\[\d+m/g, '');

export const colorizeLog = (content: string, colorScheme: string) => {
  return chalk[colorScheme](content);
};

