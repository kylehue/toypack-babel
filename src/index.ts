import { Plugin } from "toypack/types";
import { transform } from "@babel/standalone";
import { TransformOptions } from "@babel/core";

export default function (options?: TransformOptions): Plugin {
   return {
      name: "babel-plugin",
      load: {
         order: "post",
         handler(dep) {
            if (dep.type != "script") return;
            if (!/[jt]sx?$/.test(dep.lang)) return;

            const opts = Object.assign(
               {
                  filename: dep.source,
                  sourceMaps: this.shouldMap(),
               } as TransformOptions,
               options || {}
            );

            const res = transform(dep.content, opts);
            return {
               content: res.code,
               map: res.map,
            };
         },
      },
   };
}

export * from "@babel/standalone";