React Native Assignment - MoP
--

- #### Install Expo application on device  

- #### Install expo-cli globally with command:   
  `npm install -g expo-cli`

- #### Install dependencies with command:   
  `npm install`
  
- #### To run app (in development mode by default), enter command:
  `expo start`
 
  
 - #### To run app in production mode, enter command: 
   `expo start --no-dev`
   #####(expo developer tools will be opened in browser, scan QR code with Expo app on device)
-----

NOTES:
--

- ##### Used Redux for state management 
- ##### Added axios cache adapter for loading data on `CountriesListScreen` 
- ##### Implemented infinite scroll on `TopTracksByCountryScreen` 
- ##### Implemented searchbar on large lists
- ##### Optimized large lists (FlatList optimization)
- ##### All reusable functions, components etc. are separated in dedicated files
- ##### `hostType` for expo set to `lan`  (in .expo/settings.json)
- ##### Added `Loader` and `Toaster`
- ##### Tags on `TrackDetailsScreen` are clickable and onPress event navigates to tag URL
- ##### Not covered with tests

- ###IMPORTANT: 'Love track' functionality returns 'invalid method signature' error - Don't know why this error is returned as long as I was able to retrieve session key by calling `getMobileSession` API by using the same api signature (`api_sig`). API signature is generated according to Last.fm API documentation 

