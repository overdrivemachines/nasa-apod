# NASA APOD

- Uses NASA API to get random astronomy pictures of the day
- Formatted into cards. Each card has Image, Title, Add to Favorites, Description, Date and Copyright Info
- View full resolution of image in new tab
- Add Image to Favorites using Local Storage
- Favorites Page
- Load More Images - loads 10 fresh images.
- Images are lazy loaded. Load images only when close to being scrolled to.
- Mobile Responsive UI
- Loading Animation using Loaf (https://getloaf.io/)

![Preview](preview.png)

Live - https://overdrivemachines.github.io/nasa-apod/

## References

- Crop Top - Resize Images by cropping them using CSS - https://css-tricks.com/crop-top/
- Local Storage
  ```
  localStorage.clear(); - clears all keys
  localStorage.getItem("nasaFavorites"); - returns that key's value, or null if the key does not exist
  localStorage.key(5); - returns the name of the 5th key
  localStorage.removeItem("nasaFavorites"); - removes the key
  localStorage.setItem("nasaFavorites", "value"); - store the key value pair
  ```
  - Store Objects only after converting them to string:
    e.g. `localStorage.setItem("nasaFavorites", JSON.stringify(favorites));`
- Convert Object to array:
  `arr = Object.values(object1)`
- Remove the SameSite error
  - `document.cookie = 'cookie2=value2; SameSite=None; Secure';`
  - https://github.com/GoogleChromeLabs/samesite-examples/blob/master/javascript.md
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
