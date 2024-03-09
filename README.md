# ts-wait

I'm tired to write a wait function again and agin in my projects, so I make this simple project.

  ```javascript
  await wait(100) // wait 100 milliseconds
  ```

This lib does not do only this. Mainly it allows to set timetou on function, ethier synchronous or asynchronous:

 ```javascript
  try {
    const func = ()=> {/* do something synchronous */},
    const result = await waitUntil(
      func,
      10000 // <- in milliseconds
    );
  } catch (err) {
    if (isTimeoutError(error)) { {
      // fn does not complete after 10 seconds
    } else {
      // fn throws an exception
    }
  }
  ```

It throws an error of type TimeoutError it timeout occurs. The isTimeoutError is a type guard to check is error is a TimeoutError.

To set a timeout on an async function

  ```javascript
  try {
    const result = await waitUntilAsync(async () => {
      /* do something */
    }, 10000);
  } catch (err) {
    if (isTimeoutError(error)) {
      // fn does not complete after 10 seconds
    } else {
      // fn throws an exception
    }
  }
  ```
