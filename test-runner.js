const { execSync } = require("child_process");
try {
  execSync("npx vitest run src/react/__tests__", {
    stdio: ["ignore", "ignore", "pipe"],
  });
} catch (err) {
  require("fs").writeFileSync(
    "vitest-error.txt",
    err.stderr.toString(),
    "utf8"
  );
}
