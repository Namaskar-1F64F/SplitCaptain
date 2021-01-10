const fs = require("fs");
const getDirs = (path) => {
  return fs.readdirSync(path, { withFileTypes: true });
};
const rootDirs = getDirs("./src");
// don't nest more than one level because i'm not smart enough to do recursion
const oneMoreLevel = rootDirs.map(({ name }) => {
  if (name.includes(".svelte")) return name;
  if (name.includes(".")) return null;
  return fs
    .readdirSync(`./src/${name}`)
    .filter((name) => name?.includes(".svelte"));
});

const allSvelteFileNames = oneMoreLevel
  .join()
  .replace(/,/g, "")
  .split(".svelte")
  .filter(Boolean);

const translationFiles = fs
  .readdirSync("./src/translations", { withFileTypes: true })
  .filter((file) => file.name.includes(".json"));

translationFiles.forEach((file) => {
  const fileUrl = `./src/translations/${file.name}`;
  let json = fs.readFileSync(fileUrl, {
    encoding: "utf8",
  });
  const keys = Object.keys(json);
  const newKeys = allSvelteFileNames
    .filter((name) => !keys.includes(name))
    .map((n) => ({ [n]: {} }));
  json = Object.assign(...newKeys, JSON.parse(json));
  fs.writeFileSync(fileUrl, JSON.stringify(json, null, 2));
});
