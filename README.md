## QLog
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fquan-to%2Fqlog.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fquan-to%2Fqlog?ref=badge_shield)


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
import qlog from '@contaquanto/qlog';

// Main scope with fields
let log = qlog.scope('MAIN').addFields({
	hue: 'br',
	a: 1,
	stack: 'trace'
});

log.info('INFO MESSAGE');
log.debug('DEBUG MESSAGE');
log.warn('WARNING MESSAGE');
log.error('ERROR MESSAGE');
```


### Log Pattern
The slog output is expected to be like this:
```
2019-09-16T15:35:52-03:00 | I | IO    | REQ001 | MAIN > Call0 > Call1 > Call2             | test.go:38 | Doing some IO  | {"arg0":"MyArg0","huebr":"call1arg","pop":"abcde"}
```
There are some fields that are optional (like filename/line number) but it should always follow the same pattern:
```
DATETIME | LEVEL | OPERATION | TAG | SCOPE | [FILENAME:LINE NUMBER] | MESSAGE | LOG FIELDS
```
*   `DATETIME` => An ISO Datetime when the log is displayed
*   `LEVEL` => The level of the log line
    *   `I` => INFO - Shows an information usually to track what's happening inside an application
    *   `W` => WARN - Shows an warning regarding something that went in a way that might require some attention
    *   `E` => ERROR - Shows an application error that can be expected or not
    *   `D` => DEBUG - Shows some debug information to help tracking issues
    *   `F` => FATAL - Shows an error that will quit the application in that point
*   `TAG` => Line log tag. Use this for tracking related log lines. For example with a HTTP Request ID
*   `SCOPE` => The scope of the current log. Use this to trace the chain of calls inside the application. For example in a context change
*   `FILENAME: LINE NUMBER` => *OPTIONAL* When ShowLines is enabled, it will show the filename and the line number of the caller of the slog library. Use this on debug mode to see which piece of code called the log library. Disabled by default
*   `MESSAGE` => The message
*   `LOG FIELDS` => When an instance is created using `addFields` call, the fields will be serialized to either JSON or Key-Value depending on the configuration of the log instance. Defaults to JSON
#### Operations Usage
The library implements the concept of operation type. This describes which type of operation the log line represents.
*   `IO` => Anytime you do a I/O Operation such as Database or File Read/Write
*   `AWAIT` => Anytime you will do a asynchronous operation that will block the flow
*   `DONE` => After any `AWAIT` operation you should always use a `DONE` to log that the operation that did the `AWAIT` log line has finished.
*   `NOTE` => Also know as Verbose, that operation is used when you're just letting the log reader some note about the operation
*   `MSG` => Common messages such like normal information (which does not fit in other operations)
There are some syntax sugars to make easy to use Log Levels with Log Operations together:
* Warning Messages
    *   `warnDone` => Same as `log.operation(DONE).warn(message)`
    *   `warnNote` => Same as `log.operation(NOTE).warn(message)`
    *   `warnAwait` => Same as `log.operation(AWAIT).warn(message)`
    *   `warnSuccess` => Same as `log.operation(DONE).warn(message)`
    *   `warnIO` => Same as `log.operation(IO).warn(message)`
* Error Messages
    *   `errorDone` => Same as `log.operation(DONE).error(message)`
    *   `errorNote` => Same as `log.operation(NOTE).error(message)`
    *   `errorAwait` => Same as `log.operation(AWAIT).error(message)`
    *   `errorSuccess` => Same as `log.operation(DONE).error(message)`
    *   `errorIO` => Same as `log.operation(IO).error(message)`
* Debug Messages
    *   `debugDone` => Same as `log.operation(DONE).debug(message)`
    *   `debugNote` => Same as `log.operation(NOTE).debug(message)`
    *   `debugAwait` => Same as `log.operation(AWAIT).debug(message)`
    *   `debugSuccess` => Same as `log.operation(DONE).debug(message)`
    *   `debugIO` => Same as `log.operation(IO).debug(message)`
Use these syntax sugars whenever is possible, instead of calling `operation(X).level` directly.
### Multiline Logs
If a multiline log is displayed, the library will correctly ident all the messages:
```
2019-09-16T15:39:42-03:00 | I | MSG   | REQ001 | MAIN  | Multiline call
                                                         Thats the second line
                                                         Thats the third line  | {}
```
### Use Patterns
*   After calling a `await`, you should always call a `done` or `success`
*   Don't add extensive fields to `addFields` as it will pollute the log
*   Avoid multiline logs as this make parsing hard.
*   Avoid using pipes `|` in your log message or fields
*   Instead of `operation(AWAIT).warn` use `warnAwait`
*   Use `tag` to indentify calls in the same flow (for example on a HTTP Request)
*   All `LogInstance` calls returns a new `LogInstance` with the modified data. It will never change it's parent data making it completely immutable.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fquan-to%2Fqlog.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fquan-to%2Fqlog?ref=badge_large)