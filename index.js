
const COOKIE_NAME = "__gateway_auth"
/**
 * Gets the cookie with the name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to get
 */
function getCookie(request, name) {
  let result = ""
  const cookieString = request.headers.get("Cookie")
  console.log("Cookies", cookieString);
  if (cookieString) {
    const cookies = cookieString.split(";")
    cookies.forEach(cookie => {
      const cookiePair = cookie.split("=", 2)
      const cookieName = cookiePair[0].trim()
      if (cookieName === name) {
        const cookieVal = cookiePair[1]
        result = cookieVal
      }
    })
  }
  return result
}
/**
 * Handles the incoming request from the client
 * @param {Request} request incoming Request
 */
async function handleRequest(request) {
  const cookie = getCookie(request, COOKIE_NAME)
  if (cookie) {
    return await fetch(request); 
    // // return new Response(cookie)
    
    // return new Response("cookie with name: " + COOKIE_NAME);
  }
  return new Response("No cookie with name: " + COOKIE_NAME)
}

addEventListener("fetch", (event) => {
  const response = handleRequest(event.request);
  return event.respondWith(response)
})
