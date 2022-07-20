const fs = require("fs");
const { argv } = require("process");
const cliProgress = require("cli-progress");

let count = 0;

if (argv.length < 3) {
  console.log("add argument in command line");
  process.exit(1);
} else if (argv.length > 3) {
  console.log("type only one argument in command line");
  process.exit(1);
}

const stream = fs.createReadStream(argv[2]);
const chunkSize = fs.createReadStream(argv[2]).readableHighWaterMark;

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const { size } = fs.statSync(argv[2]);
bar1.start(Math.round(size / chunkSize), 0);

stream.on("data", (chunk) => {
  if (chunk) {
    bar1.update(calChunk());
  }
});

stream.on("close", () => {
  bar1.stop();
});

const calChunk = () => {
  return ++count;
};
