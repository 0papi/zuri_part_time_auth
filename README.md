# email-sender

# to run the app

`npm run server` will serve the app on localhost:5000

# about the app

This app provides RESTFUL api endpoints that can be used to authenticate and authorize users. The app provides about 4 different user roles - admin, manager, staff and user. Each route is handled based on the role that is set for the user. Additionally, other routes are protected based on predefined user roles.

# what you will see

When you register a user, it returns the user's information

![screenshot](register_route.png)

When you log in a user, it returns the auth token and additional user information

![screenshot](login_route.png)

When a user loses their password, they can reset by first entering their email address. This will send a generated link to the user's email.

![screenshot](password_reset_link_in_email.png)

When user enters new password in the reset link provided in their email, their password is reset successfully

![screenshot](password_reset_confirmation.png)
