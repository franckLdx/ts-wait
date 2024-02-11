import { wait } from "./index"

describe('Wait', () => {
  it('Should wait the required amount of time', async () => {
    const duration = 100
    const start = Date.now()
    await wait(duration)
    const stop = Date.now()
    expect(stop - start).toBeLessThan(duration * 1.10)
  })
})