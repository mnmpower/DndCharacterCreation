$(document).ready(function () {
    let elem = document.querySelectorAll('.collapsible.expandable');
    let instanceCollapsible = M.Collapsible.init(elem, {
        accordion: false,
        onOpenStart: function(){
            let el = document.querySelector('.tabs');
            let instanceTabs = M.Tabs.init(el, {});
            $('.tabs').tabs('select','Melee');
        }
    });
});