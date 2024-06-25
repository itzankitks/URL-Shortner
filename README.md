URL Shortner
- A small project on backend servers using express and handling MongoDB Database to understand the server rendering API Calls and statuscodes.
- This project is made on a MVC Pattern (Model-Controller-View)
- Designing a URL Shortner service that takes valid URL and returns a shortned version of it which redirects it to the previous URL provided without any delay or intervention.

Features
- Keeps track of the total visits/click on the link.

Routes Used:
- POST /URL - Generate new short URL and returns the shortned URL int the Format example.com/random-id
- GET /:id - redirects to the original URL
- GET /URL/analytics/:id - Returns the number of clicks for thr provided URL