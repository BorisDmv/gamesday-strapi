//vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Gamesday - Get the latest from the game world";
                return args;
            })
    },
    lintOnSave: false
}