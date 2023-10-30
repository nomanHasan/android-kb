const server = Bun.serve({
  port: 3000,
  fetch(request) {
    // console.log(request.url);
    // http://localhost:3000/text/Rudolph%20Crona

    
    
    
    console.log(request.url);
    const text = extractTextFromUrl(request.url);
    console.log(extractTextFromUrl(request.url));
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