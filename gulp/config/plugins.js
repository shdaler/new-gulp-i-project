import replace from "gulp-replace"; //Poisk i zamena
import plumber from "gulp-plumber"; //obrabotka oshibok
import notify from "gulp-notify"; //soobsheniya(podskazki)
import browsersync from "browser-sync"; //lokalniy server
import newer from "gulp-newer"; //Proverka obnovleniy
import ifPlugin from "gulp-if"; //Uslovnoe vetvlenie

//Eksportiruem object
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};
