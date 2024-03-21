function displayUserImage(container: HTMLDivElement, imgPath:string): void {

    container.innerHTML = '';

    const imgEl: HTMLImageElement = document.createElement('img');
    imgEl.src = imgPath; 

   container.appendChild(imgEl);
}

export {displayUserImage}