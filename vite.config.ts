import { defineConfig } from "vite";

export default defineConfig({
	base: "./",

	assetsInclude: ['**/*.exr'],

	build: {
		outDir: "dist",

		rollupOptions: {
			input: {
				main: "index.html",

				project1: "src/project1/index.html",

				project2: "src/geometries-project2/index.html",

				project3: "src/Curves2D-project3/index.html",

				project4: "src/polygonCutting-project4/index.html",

				project5: "src/handleCurve-project5/index.html",

				project6: "src/tubeHandle-project6/index.html",

				project7: "src/lineCutting-project7/index.html",

				project8: "src/parent-childObjects-project8/index.html",

				project9: "src/raycaster-project9/index.html"
			},
		},
	},

	server: {
		host: true
	},
});