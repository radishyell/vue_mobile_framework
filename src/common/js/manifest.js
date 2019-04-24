export default function() {
    var list = [];
    for (var i = 1; i < 32; i++) {
        list.push({
            id: 'main_gif_' + i,
            src: require(`../../assets/image/main/main_gif/${i}.jpg`)
        });
    }

    return list;
}