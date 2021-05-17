const { task, src, dest, series } = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");

const project = ts.createProject("tsconfig.json");
const code_dist = project.config.compilerOptions.outDir;

function cleanDir(name, cb) {
  fs.rmdir(name, { recursive: true, force: true }, cb);
}

function cleanCodeDist(cb) {
  cleanDir(code_dist, cb);
}

function compile() {
  return project.src().pipe(project()).pipe(dest(code_dist));
}

function copyConfig() {
  return src("package.json").pipe(dest(code_dist));
}

task("build", series(cleanCodeDist, compile, copyConfig));
