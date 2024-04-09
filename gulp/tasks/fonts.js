import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  //Ishem fayli shriftov .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%=error.message %>",
          })
        )
      )
      //Konvertiruyu d .ttf
      .pipe(fonter({ formats: ["ttf"] }))
      //Vigruzhaem v iskhodnuyu papku
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  //Ishem fayli shriftov .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%=error.message %>",
          })
        )
      )
      // Konvertiruem v .woff
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      //Vigruzhaem v papku s rezultatom
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      //Ishem fayli shriftov .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      //Konvertiruem v woff2
      .pipe(ttf2woff2())
      //Vigruzhaem v papku s rezul'tatpm
      .pipe(app.gulp.dest(`$(app.path.build.fonts)`))
  );
};
export const fontsStyle = () => {
  //Fayl stiley podklyucheniya shriftov
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  //Proveryaem sushestvuet li fayli shriftov
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Proveryaem sushestvuet li fayl stiley dlya podlyucheniya shriftov
      if (!fs.existsSync(fontsFile)) {
        //Esli net, sozdaem ego
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //Zapisivaem podklyuchenie shriftov v fayl stiley
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {
                                font-family: ${fontName}; 
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff2") format("woff2");
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        //Esli fayl est', vivodim soobshenie
        console.log(
          "Fayl scss/fonts.scss uje sushestvuet. Dlya obnovleniya fayla nujno ego udalit'"
        );
      }
    }
  });
  return app.gulp.src("${app.path.srcFolder}");
  function cb() {}
};
