(function() {
  'use strict';
  
  const modules = {};
  
  window.CoAppery = {
    registerModule: (name, module) => {
      if (modules[name]) throw new Error(`Module ${name} already exists`);
      modules[name] = module;
    },
    getModule: (name) => {
      if (!modules[name]) throw new Error(`Module ${name} not found`);
      return modules[name];
    }
  };
})();
