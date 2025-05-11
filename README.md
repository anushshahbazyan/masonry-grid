# Greetings with Masonry Grid Layout App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Please read the file till the end, there is an explanation for this.

## Used Features

In the Masonry Grid application there are several techniques used in order to achieve the desired behavior

1. masonry layout is achieved by columns css property.
this is a pretty tough decision, as you may see in the codebase changes.
there were several attempts to lay things like bricks using css grid,
as it was obvious that flex wouldn't help and the promising masonry property for grid-columns/rows was experimental.

2. there is a custom hook implemented for data loading using infinite scroll technique.
whenever scroll reaches the "boundary" or you may think of it as "guarding" element,
another portion of data is loaded, clearing duplications is ensured.

3. another custom hook ensures that image reaches the visible area of the screen to be rendered

4. I would try memoizing the row-span value (writing this because there was a point in the task specification),
if I opted with css grid approach, but as I mentioned I could not achieve what was needed and it was taking too much time.

5. there is useCallback used in order to not change the fetching function reference.

6. file structure is chosen to separate api, components, etc. in order to make project maintainance easier.
I have tried to keep imports structured too, so that different "kinds" of modules are visible and readable.

7. there is an errorboundary, as well as a fallback component for loading indication.

8. three test cases in a suite cover title, grid and detail view displaying.

9. scripts for running/linting/testing/building are listed below.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

Command line says it all but still :) you can setup `serve` easily and run the build from the `build` folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs eslint on src folder's *.ts, *.tsx files

### `npm run lint:fix`

Runs eslint on src folder's *.ts, *.tsx files with --fix option i.e. fixes all fixable lint issues.

## Learn More

I have recently learned that create-react-app is deprecated, so I do not encourage anyone to learn it.
It was pretty late as I went through lots of stuff in the task, so I did not migrate to Vite :)

To learn React, check out the [React documentation](https://reactjs.org/).
