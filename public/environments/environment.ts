// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseURL: 'http://localhost:4201/',
    URL: 'http://localhost:4201/assets/data',
    API_URL: 'http://localhost:9033/api_033',
    // API_URL: 'https://api-mnmas.athendat.site/api_033',
    SOCKET_IO: 'http://localhost:9033',
    IMAGE_PROVIDER_URL: 'https://res.cloudinary.com/athendat'
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.