import { defineConfig } from "vite";

export default defineConfig({
	base: "./",

	build: {
		outDir: "dist",

		rollupOptions: {
			input: {
				main: "index.html",

				project1: "src/project1/index.html",

				project2: "src/geometries-project2/index.html",

				project3: "src/Curves2D-project3/index.html",

				project4: "src/polygonCutting-project4/index.html",
			},
		},
	},
});