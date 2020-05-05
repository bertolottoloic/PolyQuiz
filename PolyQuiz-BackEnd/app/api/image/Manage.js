const addExtension = (file) => {     
    try {
        switch(file.mimetype){
            case 'image/jpeg':
                return '.jpg'
            case 'image/png':
                return '.png'
            default:
                throw new Error;
        }
    } catch (error) {
        console.warn("Seuls les images au format jpeg et png sont acceptées")
    }
}

module.exports = {
    addExtension
}