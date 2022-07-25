export default async function defineEventHandler(req, res) {
  if (req.method == 'POST') {
    const title = req.body.split(' ').join('+')
    const data = await fetch(
      `https://knaben.eu/search/?cat=All&q=${title}&fast=0`
    )
      .then(function (response) {
        return response.text()
      })
      .then(function (html) {
        const regex = /(\b(magnet:\?xt=)[^"]*)/i
        const found = html.match(regex)
        res.status(200).json({ found })
      })
      .catch(function (err) {
        console.warn('Something went wrong.', err)
      })
  }
}
