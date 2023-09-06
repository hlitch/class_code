import React from 'react'

export default function DisplayImages(props) {
    console.log('what is props here? ' + JSON.stringify(props.images));
    const pics = Object.entries(props.images);
    console.log('what is props now? ' + JSON.stringify(pics[3]) + typeof pics);

    let renderPics = pics.map(pic => {
        let id = pic[1]['id'];
        let farmId = pic[1]['farm'];
        let server = pic[1]['server'];
        let secret = pic[1]['secret'];
        let title = pic[1]['title'];

        console.log('what is going on here? ' + JSON.stringify(pic[1]['id']));
        console.log('what is pic?' + JSON.stringify(pic));
        let imgSrc = `https://farm${farmId}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return (
            <>
                <div>{<ol><img src={imgSrc} alt="some pic" width="200" /></ol>}</div>
                <div>{title}</div>
            </>
        );
    });

    return (
        <div>{/**/renderPics}</div>
    )
}
