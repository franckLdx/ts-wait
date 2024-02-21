import { isTimeoutError, wait, waitUntil } from "./index"

describe('Wait', () => {
  it('Should wait the required amount of time', async () => {
    const duration = 100
    const start = Date.now()
    await wait(duration)
    const stop = Date.now()
    expect(stop - start).toBeLessThan(duration * 1.10)
  })
})

describe('Wait until', () => {
  it("wait should return function return code", async function () {
    const duration = 1000;
    const result = Symbol("OK");
    const fn = async () => result;
    const actualResult = await waitUntil(fn, duration);
    expect(actualResult).toEqual(result)
  });

  it("wait should throw function exception", async function () {
    const duration = 1000;
    const errorMsg = "BOOM";
    const fn = () => {
      throw new Error(errorMsg);
    };
    let actualErr = undefined;
    try {
      await waitUntil(fn, duration);
    } catch (err) {
      actualErr = err as any;
    }
    expect(actualErr?.message).toEqual(errorMsg)
  });

  it("wait should throw TimeoutError exception", async function () {
    const duration = 1000;
    const fn = () => {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(1),
          duration * 2,
        )
      );
    };
    let actualErr = undefined;
    try {
      await waitUntil(fn, duration);
    } catch (err) {
      actualErr = err as any;
    }
    expect(actualErr).toBeDefined()
    expect(isTimeoutError(actualErr)).toBeTruthy();
  });

  it("wait should throw a custom exception", async function () {
    const duration = 1000;
    const errorMsg = "Boom";
    const fn = () => {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(1),
          duration * 2,
        )
      );
    };
    let actualErr = undefined;
    try {
      await waitUntil(fn, duration, new Error(errorMsg));
    } catch (err) {
      actualErr = err as any;
    }
    if (actualErr === undefined) {
      throw new Error("Should have thrown an exception");
    }

    expect(actualErr).toBeDefined()
    expect(isTimeoutError(actualErr)).toBeFalsy();
    expect(actualErr?.message).toEqual(errorMsg)
  });
})