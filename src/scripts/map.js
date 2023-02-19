let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [48.483850, 135.078588],
        zoom: 12,
        controls: []
    });

    const coords = [
        [48.484929, 135.074513],
        [48.537849, 135.090768],
        [48.522174, 135.040655],
        [48.441776, 135.127055]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/icon/marker.svg",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);