import _ from "lodash";

const nameParts = (name) => {
  if (!name) return ["invalid", "invalid", "invalid", "invalid"];

  const nameArray = name.trim().split(" ");
  switch (nameArray.length) {
    case 0:
    case 1:
      return ["invalid", "invalid", "invalid", "invalid"];
    case 2:
      return [sanitizeName(nameArray[0]), "", "", sanitizeName(nameArray[1])];
    case 3:
      return [
        sanitizeName(nameArray[0]),
        sanitizeName(nameArray[1]),
        "",
        sanitizeName(nameArray[2]),
      ];
    case 4:
      return [
        sanitizeName(nameArray[0]),
        sanitizeName(nameArray[1]),
        sanitizeName(nameArray[2]),
        sanitizeName(nameArray[3]),
      ];
    default:
      return [
        sanitizeName(nameArray[0]),
        sanitizeName(nameArray[1]),
        sanitizeName(nameArray.slice(2, nameArray.length - 1).join(" ")),
        sanitizeName(_.last(nameArray)),
      ];
  }
};

const sanitizeName = (name) => {
  if (!name) return "invalid";
  return name.replace(/-/g, " ");
};

export { nameParts, sanitizeName };
