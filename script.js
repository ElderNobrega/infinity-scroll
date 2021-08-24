const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArr = []



// unsplash API

const count = 10;
const apiKey = 'DqdtQRnkdjiDJ2MhArF-BU7YUrwDgBB_Ih4PUJBE4-8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}


// Create elements for links and photos, add to dom

function displayPhotos() {
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

// On load
getPhotos() 