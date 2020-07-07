export default function() {
    var list = [];

    list.push({
        id: 'bg',
        src: require(`../../assets/image/bg.jpg`)
    })

    for (var i = 1; i < 32; i++) {
        list.push({
            id: 'main_gif_' + i,
            src: require(`../../assets/image/main/main_gif/${i}.jpg`)
        });
    }

    return list;
}


// 加了id 直接用src就没办法访问了。不能这样用

// const radishImage = this.preload.getResult('https://i.postimg.cc/LXj4xyRD/radish.jpg');

// 开始加载资源
      // this.preload.loadManifest([
      //   { id: 'icon_bg_1', src: `https://i.postimg.cc/LXj4xyRD/radish.jpg` },
      //   { id: 'icon_bg_2', src: `https://i.postimg.cc/tgwBXh71/Wechat-IMG498.jpg` },
      //   { id: 'icon_bg_3', src: `https://i.postimg.cc/XYD88wf2/Wechat-IMG497.jpg` },
      //   { id: 'icon_bg_4', src: `https://i.postimg.cc/NjWXFb7w/Wechat-IMG509.jpg` },
      //   { id: 'icon_bg_5', src: `https://i.postimg.cc/8zFWTxvH/Wechat-IMG504.jpg` },
      // ]);

      
    //   this.preload.loadManifest({
    //     'manifest': [
    //       'https://i.postimg.cc/LXj4xyRD/radish.jpg',
    //       'https://i.postimg.cc/tgwBXh71/Wechat-IMG498.jpg',
    //       'https://i.postimg.cc/XYD88wf2/Wechat-IMG497.jpg',
    //       'https://i.postimg.cc/NjWXFb7w/Wechat-IMG509.jpg'
    //     ]
    //   });