import path from 'path';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import gzipPlugin from 'rollup-plugin-gzip';
import { brotliCompressSync } from 'zlib';

const production = !process.env.ROLLUP_WATCH;
const hash = String(require('child_process').execSync('git rev-parse --short HEAD')).trim(); // append short git commit to bundles

const customResolver = resolve({
  extensions: ['.js', '.svelte']
});

const projectRootDir = path.resolve(__dirname);

const aliases = alias({
	entries: [
		{ find: /@api\/([a-z\/]+)/, replacement: path.resolve(projectRootDir, 'src/api/$1.js') },
		{ find: /@lib\/([a-z\/]+)/, replacement: path.resolve(projectRootDir, 'src/lib/$1.js') },
		{ find: '@components', replacement: path.resolve(projectRootDir, 'src/components') }
	],
	customResolver
});

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'build/bundle.' + hash + '.js',
		inlineDynamicImports: true
	},
	plugins: [

		aliases,

		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		production && gzipPlugin(),
		production && gzipPlugin({
            customCompression: content =>
                brotliCompressSync(Buffer.from(content)),
            fileName: '.br',
        }),
        
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.' + hash + '.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		
		copy({
            targets: [
                {
                    src:'src/*.html',
                    dest: 'build',
                    transform: (contents) => contents.toString().replace(/\[hash\]/g, hash)
                },
                {
                    src:'src/*.css',
                    dest: 'build'
                },
                { src: 'public/*', dest: 'build' }
            ],
        }),

		replace({
	      'process.env.NODE_ENV': JSON.stringify('production'),
	    }),
		
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `build` directory and refresh the
		// browser on changes when not in production
		!production && livereload('build'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false,
        chokidar: {
            usePolling: true
        }
	}
};