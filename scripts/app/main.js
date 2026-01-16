(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const aiAgent = CoAppery.getModule('AISuperAgent').init();
    const analyzer = CoAppery.getModule('RequirementAnalyzer').init();
    const generator = CoAppery.getModule('ModuleGenerator').init();
    
    // 模組間事件總線
    window.EventBus = new Vue();
  });
})();
