import { execSync } from "child_process";

try {
  try {
    execSync("pm2 -v", { stdio: "ignore" });
    execSync("tsx -v", { stdio: "ignore" });
  } catch (prereqError) {
    console.error("pm2 is not installed. Attempting to install it...");
    // Check if bunjs is installed, if not, use npm
    try {
      execSync("bun -v", { stdio: "ignore" });
      execSync("bun i -g pm2", { stdio: "inherit" });
      execSync("bun i -g tsx", { stdio: "inherit" });
    } catch (bunError) {
      execSync("npm i -g pm2", { stdio: "inherit" });
      execSync("npm i -g tsx", { stdio: "inherit" });
    }
  }
  console.log("pm2 and tsx have been installed.");
  execSync("pm2 start --name ordering_system_backend 'tsx watch server/src/index.ts' --env TSX_TSCONFIG_PATH", {
    stdio: "inherit",
    env: {
      ...process.env,
      TSX_TSCONFIG_PATH: "./tsconfig.app.json",
    },
  });
  execSync("pm2 start --name ordering_system_frontend vite", { stdio: "inherit" });
} catch (error) {
  console.error(error);
  console.error("pm2 is not installed. Please install it using: npm i -g pm2");
  process.exit(1);
}
