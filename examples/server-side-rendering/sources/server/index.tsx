import { join } from "path"
import { render } from "preact-render-to-string"
import prepass from "preact-ssr-prepass"
import express from "express"
import { PageStaticProvider, PageTitle, PageDescription } from "preact-page"
import { pages } from "../client/pages"
import { Main } from "../client/main"

const server = express()

server.use(express.static(join(process.cwd(), "build/client")))

console.log(process.cwd())

server.all("*", async (request, response) => {
  const virtualDom = (
    <PageStaticProvider pages={pages} path={request.url}>
      <html lang="en-US">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <PageDescription />
          <PageTitle />
          <script src="/index.js" type="module"></script>
        </head>
        <body>
          <div id="root">
            <Main />
          </div>
        </body>
      </html>
    </PageStaticProvider>
  )

  await prepass(virtualDom)

  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom))
})

const port = 8000
const host = "0.0.0.0"

server.listen(port, host, () => {
  console.log(`Server listening for requests at http://${host}:${port}`)
})
