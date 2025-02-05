//Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;       //Путь к папке с результатом
const srcFolder = `./src`;      //Путь к папке с исходниками

//Основной объект 
export const path = {
    build: {                                        // Пути для создания
        js: `${buildFolder}/assets/js/`,
        vendorJs: `${buildFolder}/assets/js/`,
        css: `${buildFolder}/assets/css/`,
        vendorCss: `${buildFolder}/assets/css/`,
        html: `${buildFolder}/`,
        img: `${buildFolder}/assets/images/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        favicon: `${buildFolder}/favicon/`,
    },
    src: {                                  // пути исходников
        js: `${srcFolder}/js/main.js`,
        vendorJs: `${srcFolder}/js/vendor.js`,
        img: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        vendorScss: `${srcFolder}/scss/vendor.scss`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        favicon: `${buildFolder}/favicon/**/*.*`,
    },
    watch: {                                      //Следить за изменениями этих файлов
        js: `${srcFolder}/js/**/*.js`,
        vendorJs: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        img: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`
}