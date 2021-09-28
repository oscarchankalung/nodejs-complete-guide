# Section 03 Understanding the Basics

1. How The Web Works
2. The Node Lifecycle & Event Loop
3. Creating a Node Server //
4. Understanding Requests
5. Sending Responses
6. Request & Responses Headers
7. Routing Requests
8. Redirecting Requests
9. Parsing Request Bodies //
10. Understanding Event Driven Code Execution
11. Blocking and Non-Blocking Code
12. Behind the Scenes of Node.js
13. Using the Node Modules System

## Node.js Program Lifecycle

```
node app.js
// start script
// parse code, register variables and functions
/* node application create an event loop that
   keeps on running as long as there are
   event listeneres registered */
process.exit
```

## Node.js Event Driven Architecture

- Execute process in operating system which use multi-threading
- Continue event loop to listen for event callbacks
- Dispatch tiny actions asynchronously to prevent blocking
- Come back to callback once previous operation is done

## Node.js Behind the Scenes

### Performance: single thread, event loop and blocking code

**Single JavaScript Thread** starts **Event Loop** that handles **Event Callbacks** containing fast finishing code. File system operations and other long taking operations are sent to **Worker Pool** that does the heavy lifting by spining up multiple threads. Once the worker is done, it will trigger the callback managed by the event loop.

### Event loop: programm lifecycle

1. **Timer Phase** that execute `setTimeout` and `setInterval` callbacks
2. **Pending Callback Phase** that exeute I/O, network and long taking callbacks that were deferred
   - Continue loop iteration and postpone outstanding callback to the next iteration
3. **Poll Phase** that retrieve and execute new I/O events, otherwise
   - Defer the execution and register as pending callbacks
   - Jump to Timer phase and execute timer callbacks if exist
4. **Check Phase** that execute `setImmediate` callbacks
5. **Close Callack Phase** execute all 'close' event callbacks
6. Exist process if no remaining event handlers (`refs == 0`)

### Security: global and local scope

By default, callback method in create server gets executed for very new incoming request. Since each function is only scroped to itself and not accessible by the other functions, anything we do to to tge request or response object inside the callback will not be exposed to the request or response objects.

## Concepts

- Node.js Event Loop
- Node.js Streams and Buffers
- HTTP Request (url, method and headers)
- HTTP Response

## Codes

```
request.url
request.method
request.headers
```

```
respond.setHeader()
respond.writeHead()
respond.write()
respond.end()
```

## Useful Resources

- [Official Node.js Docs](https://nodejs.org/en/docs/guides/)
- [Full Node.js Reference (for all core modules)](https://nodejs.org/dist/latest/docs/api/)
- [More about the Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [Blocking and Non-Blocking Code](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)
