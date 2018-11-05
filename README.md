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

- ###IMPORTANT: 'Love track' functionality returns 'invalid method signature' error - I think it is some kind of error on server side because generated method signature is valid, using it I was able to create session key by calling `auth.getMobileSession` API, but with the same method signature and retrieved session key, I get error on `love.track` API

