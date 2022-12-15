# Heremaps Dom Marker + Shadow DOM

Sample mock app to showcase an issue with heremaps and DOM Markers

## Instructions
- Requires a *valid* heremaps API Key to work to be added to `CONFIG.mjs` file
- in the terminal run `npx lite-server ./` (or any other way you prefer to run this folder in localhost)
- on file `VectorMap.mjs` inside the `addMarkers()` function on line `164` under theme you can toggle whether you want the map to break or not by changing the boolean value on the function call `this.getCustomTheme(true||false)`

## Hypothesis
Depending on the integration pattern, our app, may or may not have *one* or *more* shadow DOM wrappers around it.

When that happens, adding a DomMarker will make the app break because it can't find the "way" to the shadow dom where the map is.

It works with the standard Here Marker because it all happens inside the canvas element.

We require DOM Markers to enrich user experience.

## Weird stuff / X-Files material
- this started failing two weeks ago without having been changed/edited
- markers are added on top of map, so adding knows where the map is, but it fails upon map interaction (simple hover)
