import { log } from "console";
import { cp } from "fs";
const copyPromise = new Promise((res, rej) => {
  cp("./images", "./client/images", { recursive: true }, (err) => {
    if (err) rej(err);
    res("success");
  });
});

copyPromise.then(
  (suc) => {
    console.log(suc);
  },
  (err) => {
    console.error(err);
  }
);
