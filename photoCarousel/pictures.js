/*global $ */
(function () {
    'use strict';


    const pictureDisplay = $('#pictureDisplay');
    const namePlace = $('#nameElem');

    const nextButton = $('#next');
    const previousButton = $('#previous');
    const inputText = $('#inputText');
    const inputButton = $('#inputButton');

    let currentIndex = 0;

    async function loadJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (e) {
            console.error('oops', e);
        }

    }

    async function getFlickr() {
        try {
            const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c9ba425cd1aafe8bc179c234f8acccde&text=${inputText.val()}&format=json&nojsoncallback=1`);
            const test = await response.json();
            console.log(test);
            return test;
        } catch (e) {
            console.log(e);
        }
    }


    let j = 0;
    async function getPhotos() {
        let pictures = await getFlickr();

        for (let i = j; i < j + 3; i++) {
            let id = pictures.photos.photo[i].id;
            let farmId = pictures.photos.photo[i].farm;
            let server = pictures.photos.photo[i].server;
            let secret = pictures.photos.photo[i].secret;

            let imgSrc = `https://farm${farmId}.staticflickr.com/${server}/${id}_${secret}.jpg`;
            let firstPic = $(`<ol><img src="${imgSrc}" alt="dog pic" width="200"></ol>`);
            pictureDisplay.append(firstPic);

        }
    }



    inputButton.click(async function () {
        getFlickr();
        getPhotos();
    });


    nextButton.on('click', async function () {
        let pictures = await getFlickr();
        pictureDisplay.empty();
        j += 3;
        console.log('j ' + j);
        for (let i = j; i < j + 3; i++) {
            let id = pictures.photos.photo[i].id;
            let farmId = pictures.photos.photo[i].farm;
            let server = pictures.photos.photo[i].server;
            let secret = pictures.photos.photo[i].secret;

            let imgSrc = `https://farm${farmId}.staticflickr.com/${server}/${id}_${secret}.jpg`;
            let firstPic = $(`<ol><img src="${imgSrc}" alt="dog pic" width="200"></ol>`);
            pictureDisplay.append(firstPic);

        }
    });

    previousButton.on('click', async function () {
        let pictures = await getFlickr();
        if (j >= 3) {
            pictureDisplay.empty();
            j -= 3;
            console.log('j ', j);
            for (let i = j; i < j + 3; i++) {
                let id = pictures.photos.photo[i].id;
                let farmId = pictures.photos.photo[i].farm;
                let server = pictures.photos.photo[i].server;
                let secret = pictures.photos.photo[i].secret;

                let imgSrc = `https://farm${farmId}.staticflickr.com/${server}/${id}_${secret}.jpg`;
                let firstPic = $(`<ol><img src="${imgSrc}" alt="dog pic" width="200"></ol>`);
                pictureDisplay.append(firstPic);

            }
        }
        else {
            console.log('cant go back ' + j);
        }

    })




})();

