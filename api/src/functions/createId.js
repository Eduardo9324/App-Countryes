const createId = (change = false) => {
  let code = "";
  const leterCode = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  ];

  for (let x = 0; x < 1; x++) {
    for (let i = 0; i < 3; i++) {
      if (change) {
        code += Math.round(Math.random() * 100000);
      } else {
        code += leterCode[Math.round(Math.random() * (leterCode.length - 1))];
      }
    }
    change = !change;
    code.length == 3 ? code : (code += "");
  }

  return code;
};


module.exports = {
  createId
};

/* function genPassword() {
  let wordchars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = [];
  let passwordLength = 3;
  for (let i = 0; i < passwordLength; i++) {
    let fun = wordchars.charAt(Math.floor(Math.random() * wordchars.length));
    password.push(fun);
  }
  return password.join("");
}

module.exports = {
  genPassword
}; */