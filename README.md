# Neighborhood map project

This is final project for Udacity Google Front-End Development Nanodegree Scholarship Program.

Neighborhood map is a presentation of interesting places one can visit in Wrocław. One can select from three categories: restaurants, parks and monuments. Clicking on location in menu or pin on the map shows a list of pictures from that location. Images are dynamically queried from Flickr.

## Service Worker
Service worker is only available in production build. To see it in action please check the _npm run build_ script description.

## Two type of views 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

npm run build creates a build directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served index.html, and requests to static paths like /static/js/main.<hash>.js are served with the contents of the /static/js/main.<hash>.js file.

## Dependencies

https://www.google.com/maps<br>
Google Maps service.

https://github.com/google-map-react/google-map-react<br>
NPM package that add React package for interacting with Google Maps.

https://material-ui.com/<br>
Set of beautiful and user friendly React UI components.

https://www.flickr.com/<br>
Image hosting service. Photographies displayed in the UI are queried dynamically from this service based on predefined tags.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Some parts of this readme are taken directly from Create React App README.md. Especially around run and build scripts.
