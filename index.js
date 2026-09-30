function main() {
  let str = "abc";
  console.log("str", str);
  function hello(s) {
    s = "cb";
    console.log(s);
  }

  hello(str);
}

main();
