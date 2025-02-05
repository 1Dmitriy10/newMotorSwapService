import webpack from "webpack-stream"

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) // путь к папке со скриптами
        .pipe(app.plugins.plumber(                      //Ошибки в виндоус
            app.plugins.notify.onError({
                title: "js",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? "production" : "none",
            optimization: {
                // minimize: false
            },
            output: {
                filename: 'main.js'
            },
            module: {
                rules: [
                    {
                        test: /\.(sass|less|css)$/,
                        use: ["style-loader", "css-loader", 'sass-loader'],
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(app.path.build.js)) // в какой файл выгрузить
        .pipe(app.plugins.browserSync.stream())
}

//===============================

export const vendorJs = () => {
    return app.gulp.src(app.path.src.vendorJs, { sourcemaps: app.isDev }) // путь к папке со скриптами
        .pipe(app.plugins.plumber(                      //Ошибки в виндоус
            app.plugins.notify.onError({
                title: "vendorJs",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? "production" : "none",
            optimization: {
                // minimize: false
            },
            output: {
                filename: 'vendor.js'
            },
            module: {
                rules: [
                    {
                        test: /\.(sass|less|css)$/,
                        use: ["style-loader", "css-loader", 'sass-loader'],
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(app.path.build.vendorJs)) // в какой файл выгрузить
        .pipe(app.plugins.browserSync.stream())
}


