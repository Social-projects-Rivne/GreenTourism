exports.forgotPassword = function(email, token, host) {
  return {
    to: email,
    from: 'passwordreset@demo.com',
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you (or someone else) have ' +
      'requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser ' +
      'to complete the process:\n\n' +
      'http://' + host + '/api/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your' +
      'password will remain unchanged.\n'
  };
};

exports.passwordResetSuccess = function(email) {
  return {
    to: email,
    from: 'passwordreset@demo.com',
    subject: 'Your password has been changed',
    text: 'Hello,\n\n' +
    'This is a confirmation that the password for your account ' + email +
    ' has just been changed.\n'
  };
};
