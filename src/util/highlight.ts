import { HLJSApi } from "highlight.js";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cplusplus from "highlight.js/lib/languages/cpp";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";

export const getConfiguredHighlight = (): HLJSApi => {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("go", go);
    hljs.registerLanguage("rust", rust);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("shell", shell);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("scss", scss);
    hljs.registerLanguage("yaml", yaml);
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("dockerfile", dockerfile);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("cplus", cplusplus);
    hljs.registerLanguage("python", python);

    hljs.registerAliases(["golang"], { languageName: "go" });
    hljs.registerAliases(["ts"], { languageName: "typescript" });
    hljs.registerAliases(["js", "ecmascript"], { languageName: "javascript" });
    hljs.registerAliases(["c++", "cplusplus"], { languageName: "cplus" });
    hljs.registerAliases(["css"], { languageName: "scss" });

    hljs.configure({ ignoreUnescapedHTML: true });

    return hljs;
};
