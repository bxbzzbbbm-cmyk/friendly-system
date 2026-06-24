const { execSync } = require("child_process");
const readline = require("readline");

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

function ask(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

(async () => {
  console.clear();

  console.log("╦ ╦┬┌┐┌ ╔╦╗┌─┐┬─┐┌┬┐┬ ┬─┐ ┬");
  console.log("║║║││││  ║ ├┤ ├┬┘││││ │┌┴┬┘");
  console.log("╚╩╝┴┘└┘  ╩ └─┘┴└─┴ ┴└─┘┴ └─");
  console.log("[+] YouTube: TermuxProfessor");
  console.log("[+] Github: termuxprofessor");
  console.log("");

  const input = await ask(
    "Does WIN10TP.iso exist in your Download folder? (Yes/No): "
  );

  if (/^(yes|y)$/i.test(input)) {
    run("termux-wake-lock");
    run("pkg install x11-repo -y");
    run("pkg install qemu-system-x86_64 -y");

    console.clear();
    console.log("1] Allow Storage Permission To Termux.");

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.clear();

    const ram = await ask(
      "Enter RAM size in MB (e.g. 1024=1GB, 2048=2GB, 4096=4GB): "
    );

    console.log("[+] Server Is Running....");
    console.log("VNC Server: 127.0.0.1:5902");

    run(
      `qemu-system-x86_64 -m ${ram} -cdrom ~/storage/downloads/WIN10TP.iso -vnc 127.0.0.1:2`
    );
  } else if (/^(no|n)$/i.test(input)) {
    console.log(
      "1. First download WIN10TP.iso and place it in ~/storage/downloads/"
    );
    console.log(
      "2. Put WIN10TP.iso file into the Download folder."
    );
    process.exit(2);
  } else {
    console.log("Invalid Option");
    process.exit(1);
  }
})();
