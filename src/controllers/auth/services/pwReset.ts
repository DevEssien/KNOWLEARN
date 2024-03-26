/**
 * create a resetPassword function that accepts userId, token, newPassword parameters and returns a boolean true on no errors
 * with userId, check if password Reset token exists in the Token table
 * if it does validate token with the password reset token in the token table using the bcryptCompare
 * if the password reset token is valid then hash  newPassword
 * update the password field in the user table
 * get the user email by finding the user by userId and send a password reset successful confirmation email
 * delete the password reset token in the token table'
 * return true
 */
