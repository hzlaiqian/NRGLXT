module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
         proxy: {
             '/nrglxt':{
                target:'http://47.96.18.55:8080/nrglxt',
                changeOrigin:true,
                 pathRewrite:{
                    '^/nrglxt':''
                }}
        }
     }
}
