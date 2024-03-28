function displayUserImage(imgPath:string): void {
    const imageContainer: HTMLDivElement = document.querySelector('.imgContainer') as HTMLDivElement;

    imageContainer.innerHTML = '';

    const imgEl: HTMLImageElement = document.createElement('img');
    imgEl.src = imgPath; 

    imageContainer.appendChild(imgEl);
}

export {displayUserImage}