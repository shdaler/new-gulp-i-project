//Osnovnoy modul
import gulp from "gulp";
//import putey
import { path } from "./gulp/config/path.js";
//import obshikh plaginov
import { plugins } from "./gulp/config/plugins.js";

//Peredaem znachenuiya v globalnuyu peremennuyu
global.app = {
  isbuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//import zadach
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

//nablyudatel' za izmeneniyami v faylakh
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

//Posledovatel'nost' obrabotki shriftov
// const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Osnovnie zadachi
// const mainTasks = gulp.series(fonts,gulp.parallel(copy, html, scss, js, images));
const mainTasks = gulp.parallel(copy, html, scss, js, images);

//Postroenie scenariev vipolneniya zadach
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//Export scenariev
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

//Vipolnenie scenariya po umolchaniyu
gulp.task("default", dev);
