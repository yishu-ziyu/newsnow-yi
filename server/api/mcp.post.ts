import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { getServer } from "#/mcp/server"

export default defineEventHandler(async (event) => {
  const req = event.node.req

  // The dev proxy chain strips `accept` (other headers arrive intact) and the
  // MCP transport refuses requests without it. This endpoint only speaks MCP,
  // so default the header when it is missing.
  if (!req.headers.accept) {
    req.headers.accept = "application/json, text/event-stream"
  }
  const res = event.node.res
  const server = getServer()
  try {
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
    transport.onerror = console.error.bind(console)
    await server.connect(transport)
    await transport.handleRequest(req, res, await readBody(event))
    res.on("close", () => {
      // console.log("Request closed")
      transport.close()
      server.close()
    })
    return res
  } catch (e) {
    console.error(e)
    return {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error",
      },
      id: null,
    }
  }
})
