/*global $ */
(function () {
    'use strict';


    const pictureDisplay = $('#pictureDisplay');
    const namePlace = $('#nameElem');

    const nextButton = $('#next');
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

    // async function getAnimal(url) {
    //     const choice = await loadJson(`${url}.json`);
    //     let c = choice[currentIndex];

    //     const theName = $(`<div>${c.name}</div>`);
    //     const thePic = $(`<ol><img src="${c.url}" alt="dog pic" width="200"></ol>`);
    //     namePlace.append(theName);
    //     pictureDisplay.append(thePic);

    // }

    async function getPhotos() {
        let pictures = await getFlickr();
        //console.log('am I getting photos ' + JSON.stringify(pictures));
        //let id = photos.id;
        console.log('am I getting id ' + pictures.photos.photo[0].id);
        console.log('am I getting farm ' + pictures.photos.photo[0].farm);
        console.log('am I getting server ' + pictures.photos.photo[0].server);
        console.log('am I getting secret ' + pictures.photos.photo[0].secret);

        let id = pictures.photos.photo[0].id;
        let farmId = pictures.photos.photo[0].farm;
        let server = pictures.photos.photo[0].server;
        let secret = pictures.photos.photo[0].secret;

        let imgSrc = `https://farm${farmId}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        let firstPic = $(`<ol><img src="${imgSrc}" alt="dog pic" width="200"></ol>`);
        pictureDisplay.append(firstPic);
    }

    inputButton.click(async function () {
        //namePlace.empty();
        //pictureDisplay.empty();
        //const selection = inputText.val();
        //getAnimal(selection);
        getFlickr();
        getPhotos();
    });

    // nextButton.click(async function () {
    //     namePlace.empty();
    //     pictureDisplay.empty();
    //     currentIndex++;

    //     const url = inputText.val();
    //     getAnimal(url);
    //     if (currentIndex === 3) {
    //         currentIndex = 0;
    //     }
    // });
})();

