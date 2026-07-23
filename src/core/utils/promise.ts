export async function wait (time: number = 1000) {
  await new Promise((res) => {
    setTimeout(() => {
      res(true)
    }, time);
  })
}