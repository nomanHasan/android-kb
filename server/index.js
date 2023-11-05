const server = Bun.serve({
  port: 11143,
  async fetch(request) {
    // console.log(request.url);
    // http://localhost:3000/text/Rudolph%20Crona




    console.log(request.url);
    const text = extractTextFromUrl(request.url);
    console.log(extractTextFromUrl(request.url));

    // Run Bash Command here

    const proc = Bun.spawn(["xdotool", "type", `${text}`]);

    // await completion
    await proc.exited;
    // Let's try to make the official documentation process a little bit easier. F*** would be the idea process that I can use to write good and long documentationsI think I'm using a buffer or a without time for my input to be coherent and meaningfulBut I don't think it works with longer speeches because not a because of my pizza device, but I think it's because of the server to client communication stuff that I have not figured out yetOkay, I think I can just right now without any communication hiccups
    
    return new Response(JSON.stringify({
      status: 200,
      result: 'inputted',
      text: text,
    }));
    // return new Response(`{
    //   "status": "200",
    //   "result": "inputted",
    //   "text": "${text}"
    // }`);
  },
});

console.log(`Listening on localhost:${server.port}`);



function extractTextFromUrl(url) {
  const link = new URL(url);
  return link.searchParams.get('data')
}