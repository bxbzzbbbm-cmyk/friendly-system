const { execSync } = require("child_process");

function run(cmd) {
  try {
    execSync(cmd, {
      stdio: "inherit",
      shell: "/bin/bash"
    });
  } catch (e) {
    console.error("Failed:", cmd);
  }
}

while (true) {
  run("sleep 21600");
}
