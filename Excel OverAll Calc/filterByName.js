function filterByName(arr, name) {
    console.log(( arr.filter((el) => el.name == name)));
    // arr.filter((el) => el.name.include(name))
  return arr.filter((el) => el.name == name);
}

module.exports = filterByName;
