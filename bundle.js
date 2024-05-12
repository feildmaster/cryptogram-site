import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['public/modules/fallback.js'],
  bundle: true,
  minify: true,
  outfile: 'public/cryptogram.js',
  target: 'safari11',
  sourcemap: true,
});
