## QLog

A smart logging tool, defined to be minimalist and simple.

## API Cheatsheet

### addFields

To be added

### subScope

To be added

## Log levels

#### info

<img src="https://i.ibb.co/MSdkY34/Captura-de-Tela-2019-08-28-a-s-20-20-52.png" alt="Captura-de-Tela-2019-08-28-a-s-20-20-52" border="0" />

> Displays a info message

#### error

<img src="https://i.ibb.co/Ns1dRks/Captura-de-Tela-2019-08-28-a-s-20-24-58.png" alt="Captura-de-Tela-2019-08-28-a-s-20-24-58" border="0" />

> Displays a error message

#### debug

<img src="https://i.ibb.co/LzNctcn/Captura-de-Tela-2019-08-28-a-s-20-20-46.png" alt="Captura-de-Tela-2019-08-28-a-s-20-20-46" border="0" />

> Displays a debug message

#### warn

<img src="https://i.ibb.co/0KmNxwz/Captura-de-Tela-2019-08-28-a-s-20-25-05.png" alt="Captura-de-Tela-2019-08-28-a-s-20-25-05" border="0">

> Displays a warning message

## Usage

```js
import { default as qlog } from 'qlog';

// Main scopte with fields
let log = qlog.scope('MAIN').addFields({
	hue: 'br',
	a: 1,
	stack: 'trace'
});

qlog.info('INFO MESSAGE');
qlog.debug('DEBUG MESSAGE');
qlog.warn('WARNING MESSAGE');
qlog.error('ERROR MESSAGE');
```

## What you need to know

- What are my scope stack?
- What are my Fields?
