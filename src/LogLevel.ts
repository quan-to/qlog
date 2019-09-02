enum LogLevel {
  INFO = 'I',
  WARN = 'W',
  ERROR = 'E',
  DEBUG = 'D',
}

const LevelColors = {};

LevelColors[LogLevel.INFO] = 'green';
LevelColors[LogLevel.DEBUG] = 'magenta';
LevelColors[LogLevel.WARN] = 'yellow';
LevelColors[LogLevel.ERROR] = 'red';

export default LogLevel;

export {
  LogLevel,
  LevelColors,
}
