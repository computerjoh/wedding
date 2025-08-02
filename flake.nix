{
  description = "Wedding Site with Bun, React, Tailwind, and Vercel CLI";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          bun
          nodejs_20
          wrangler
        ];

        shellHook = ''
          echo "Bun: $(bun --version)"
          echo "Node: $(node --version)"
          echo "Wrangler: $(wrangler --version)"
        '';
      };
    });
}
