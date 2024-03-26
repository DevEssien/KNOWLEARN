/**
 * create a requestPasswordReset function that accepts email as its parameter and returns a string
 * check if user exists
 * check if token exists in token table, if it does delete it
 * create reset token with crypto module
 * hash the created reset token with bcrypthash
 * create new token with the useId, hashedToken and current date
 * create a link to send to the user email consisting of the userId, token and newly created hashed password
 * return link
 */
