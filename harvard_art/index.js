// export statement is used when creating JS modules to export live bindings to functions, objects, or primitive values from the module so they can be used by other programs with the import statement.
// bindings that are exported can still be modified locally; when imported, although they can only be read by the importing module the value updates whenever it is updated by the exporting module
import initSelectOptions from "./select.js";
import initSearch from "./search.js";
import initPagination from "./pagination.js";

initSelectOptions();
initSearch();
initPagination();
