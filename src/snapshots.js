import path from 'path';
import url from 'url'
import jsdom from 'jsdom'
import { write } from './Writer'

const snap = ({baseUrl, baseDir}) => {
	const { protocol, host, path } = url.parse(baseUrl);
  	return new Promise((resolve, reject) => {
		jsdom.env({
			url: `${protocol}//${host}${path}`,
			resourceLoader(resource, callback) {
				if (resource.url.host === host) {
					resource.defaultFetch(callback);
				} else {
					callback()
				}
			},
			features: {
				FetchExternalResources: ["script"],
				ProcessExternalResources: ["script"],
				SkipExternalResources: false
			},
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			done: (err, window) => {
				if (err) reject(err)
				resolve(window)
			}
		})
	}).then(window => {
    	const content = jsdom.serializeDocument(window.document)
		let filename;
		if (path === "/"){ 
			filename = `index.html`;
		} else {
			filename = `${path}/index.html`
		}
		console.log(`✏️   Saving ${path} as ${filename}`);
		return write({baseDir, filename, content});
	}).catch((err) => {
		console.log("error: ", error);
	});
};

// return array of promises
export default ({baseDir, paths, port}) => {
	const snapshots = paths.map((path) => {
		return snap({ baseUrl: `http://localhost:${port}${path}`, baseDir });
	});
	return Promise.all(snapshots);
}