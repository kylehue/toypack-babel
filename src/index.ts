import { Plugin } from "toypack/types";
import { transform } from "@babel/standalone";
import { TransformOptions } from "@babel/core";

export default function (options?: TransformOptions): Plugin {
   return {
      name: "babel-plugin",
      load: {
         order: "post",
         handler(moduleInfo) {
            if (moduleInfo.type != "script") return;
            if (!/[jt]sx?$/.test(moduleInfo.source.split("?")[0])) return;

            const opts = Object.assign(
               {
                  filename: moduleInfo.source,
                  sourceMaps: this.shouldMap(),
               } as TransformOptions,
               options || {}
            );

            const res = transform(moduleInfo.content, opts);
            return {
               content: res.code,
               map: res.map,
            };
         },
      },
   };
}

export * as Babel from "@babel/standalone";
