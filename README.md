# React Static Generator

Static file generator that can be plugged into any react project. 
A lightweight solution for single page apps like blogs, landing pages or mobile web apps. 

React Static Generator is great for small projects with 1-10 pages. For larger apps like e-commerce I would still recommend to use Universal Rendering. 

This project is heavily inspired by [React Snapshot](https://github.com/geelen/react-snapshot) and [Webpack Static Site Generator Plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin).

# Benefits

- static content is SEO friendly 
- better User Experience
- no need for Express server
- can be hosted on CDN like netlify or surge

# How it works?

- Say you have a landing page with 2 routes: "/" and "/page1".  
- You then build your project for production using webpack as usual.  
- Once your code is minified and exported to `dist` folder you trigger `yarn build && react-static`.  
- React-static will spin a new node server with jsdom browser.  
- It will then look up your package.json config for the list of routes that you want to prerender.  
- Lastly, it will open each page with `user-agent: Node` and make the react-static to use `ReactDOMServer.renderToStaticMarkup` instead of `ReactDOMServer.render`.  
- Each page is then saved to it's corresponding folder:  
"/" -> index.html  
"/page1" -> page1/index.html  

After that you have a dist folder ready to be deployed to netlify or surge.sh and when you visit /page1 directly in your browser you should see prerendered html content.

## Usage

- `yarn add react-static-generator --dev`
- add config to your package.json:
```
"static": {
  "paths": ["/", "/page1"], 
  "outputPath": "build"
},
```
- open your package.json and change `"scripts"` from
```diff
- "build": "react-scripts build"
+ "build": "react-scripts build && react-static"
```

- Change your usage of `react-dom`:
```diff
- import ReactDOM from 'react-dom';
+ import { render } from 'react-static-generator';

- ReactDOM.render(
+ render(
    <App/>,
    document.getElementById('root')
  );
```

## Configuration

```
"paths" - either an array of paths, i.e. ["/", "/page1"] or a path to a JSON file i.e. custom.json (defaults to ["/"])
"port" - you might specify port if you run into conflicts on your machine (defaults to "2999")
"publicPath" - a virtual path in the url, i.e. "/static" (defaults to "/")
"outputPath": - a path to your output folder, i.e. "build","dist"(defaults to "dist")
```

## Try it yourself

- `cd example` 
- `yarn install`
- `yarn build`
- serve build folder with `http-server`

See example's [source code](https://github.com/kzima/react-static/tree/master/example).

## Create-react-app demo

[https://magician-brian-21017.netlify.com](https://magician-brian-21017.netlify.com)


## The Alternatives

This should work for simple cases. For less simple cases, go with:

- [React Snapshot](https://github.com/geelen/react-snapshot) if you want snapshot to crawl your links automatically.
- [Webpack Static Site Generator Plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin) - requires webpack config
- [Gatsby](https://github.com/gatsbyjs/gatsby) or [Phenomic](https://phenomic.io/) if you're doing something bigger or more structured. Phenomic has service worker support & minimal bundles and all kinds of things, Gatsby is getting that stuff too.
- [Universal Rendering](http://redux.js.org/docs/recipes/ServerRendering.html) for large apps

## License

MIT
