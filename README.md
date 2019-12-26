# JWT (Json Web Tokens) implementation using Node.js/Express

A basic JWT implementation using express. 

Generates two types of token, i.e. Access Tokens (used to access the API) and Refresh Tokens (used to generate access tokens)

Access token is invalided after a specific duration (currently 40 seconds), after which refresh token can be used to generate a new token.

Operates on two servers. One server is responsible for the authentication and the other one is the base API. This type of structure allows to scale the two different types of server/work (authentication and API) separately.
