const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0
let totalImages = 0
let photosArr = []

// unsplash API

const count = 30;
const apiKey = 'DqdtQRnkdjiDJ2MhArF-BU7YUrwDgBB_Ih4PUJBE4-8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {   
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}


// Create elements for links and photos, add to dom

function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArr.length
  // run function for each object in photosArr
  photosArr.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a')
      setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    })
    
    // Create <img> for photo
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event listener, check when each photo is finished loading
    img.addEventListener('load', imageLoaded)

    // put <img> inside <a>, then put both inside image container element
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArr = await response.json()
    displayPhotos()
  } catch (error) {
    
  }
}

// check to see if scrolling is near bottom of page, => load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

// On load
getPhotos() 