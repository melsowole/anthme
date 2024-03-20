function displayUserImage(imgPath:string): void {
    const fullPath = './img/' + imgPath; 
    console.log("Image path when function is called:", fullPath);

    const imageContainer: HTMLDivElement = document.querySelector('.imgContainer') as HTMLDivElement;

    imageContainer.innerHTML = '';

    const imgEl: HTMLImageElement = document.createElement('img');
    imgEl.src = imgPath; 

    imageContainer.appendChild(imgEl);
}

export {displayUserImage}