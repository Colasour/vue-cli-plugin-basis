module.exports = (api, opts, files) => {
  // Update public/index.html
  const indexHTML = files['public/index.html'];
  if (indexHTML) {
    const lines = indexHTML.split(/\r?\n/g).reverse();
    const title = lines.findIndex(line => line.match(/^\s*<title/));
    lines[title] = '';

    files['public/index.html'] = lines.reverse().join('\n');
  }
};
