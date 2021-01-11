// module.exports = {
//     extensions: require("./extensions/extensions.js")
// }
path = require("path");

module.exports = {
	alias: {
		vue$: "vue/dist/vue.esm.js",
		// "ui-slider": "jquery-ui/ui/widgets/slider.js",
		modules: path.join(__dirname, "node_modules"),
	},
    extensions: require("./extensions/extensions.js"),
}