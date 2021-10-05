function htmlToElement(html) {
  var template = document.createElement('div');
  template.innerHTML = html.trim();
  return template.firstChild;
}

const chevronIcon = `<span class="d-inline-block tree-icon"><i class="fas fa-chevron-down"></i></span>`;
const linkIcon = `<span class="d-inline-block tree-icon"><i class="fas fa-link"></i></span>`;


const menu_html = `
<ul id="menu-tree">

<li id="li3">
<a id="a3" href="#">
  Link 7 _ new
</a>
</li>
      <li id="li1">
        <a id="a1" href="#">
          Link 1
        </a>
      </li>
      <li id="li2">
        <a id="a2">
          Collapse 1
        </a>
        <ul id="ul1">
          <li id="li4">
            <a id="a4">
              Collapse 2
            </a>
            <ul id="ul2">
              <li id="li6">
                <a id="a6" href="#">
                  Link 2
                </a>
              </li>
              <li id="li7">
                <a id="a7" href="#">
                  Link 3
                </a>
              </li>
              <li id="li8">
                <a id="a8">
                  Collapse 3
                </a>
                <ul id="ul3">
                  <li id="li9">
                    <a id="a9" href="#">
                      Link 4
                    </a>
                  </li>
                  <li id="li10">
                    <a id="a10" href="#">
                      Link 5
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li id="li5">
            <a id="a5" href="#">
              Link 6
            </a>
          </li>
        </ul>
      </li>
    </ul>

`

function copyAttrs(src, target) {
  for (let attr of src.attributes) {
    target.setAttribute(attr.name, attr.value);
  }
}


function update_tree(menu, menu_html) {
  let old_menu = menu.cloneNode(true);

  let new_menu = htmlToElement(menu_html);
  menu.innerHTML = new_menu.innerHTML;
  init_tree(menu);

  new_menu = menu;

  const old_node_ids = Array.from(old_menu.querySelectorAll("[id]")).map((i) => i.getAttribute("id"));

  old_node_ids.forEach((id) => {
    var new_node = new_menu.querySelector("#" + id);
    var old_node = old_menu.querySelector("#" + id);
    copyAttrs(old_node, new_node);
  });

  handle_tree(menu);
}


function init_tree(menu) {
  menu.classList.add("nav", "flex-column");
  menu.querySelectorAll("ul").forEach((ul) => ul.classList.add("nav", "flex-column"));
  menu.querySelectorAll("li").forEach((li) => {
    li.classList.add("nav-item");
    const a = li.querySelector("a");
    if (li.querySelector("ul")) {

      a.classList.add("nav-link", "tree-group-link");
      a.prepend(htmlToElement(chevronIcon));
      a.setAttribute("data-bs-toggle", "collapse");
      a.setAttribute("role", "button");
      a.setAttribute("aria-expanded", "false");


      const ul = li.querySelector("ul");

      a.setAttribute("href", "#menuTreeCollapse_" + ul.getAttribute("id"));
      a.setAttribute("aria-controls", "menuTreeCollapse_" + ul.getAttribute("id"));

      var collapsable = document.createElement('div');
      collapsable.classList.add("collapse", "ms-4");
      collapsable.setAttribute("id", "menuTreeCollapse_" + ul.getAttribute("id"));
      li.replaceChild(collapsable, ul);
      collapsable.appendChild(ul);

    } else {

      a.classList.add("nav-link", "tree-link", "btn-outline-light");
      a.prepend(htmlToElement(linkIcon));

    }
  });

  handle_tree(menu);
}

function handle_tree(menu) {
  menu.querySelectorAll('a.tree-link').forEach((item) => {
    item.addEventListener('click', () => {
      menu.querySelectorAll('a.tree-link').forEach((link) => {
        link.classList.remove('active', 'btn-outline-light');
      });
      item.classList.add('active', 'btn-outline-light');
    });
  });

  menu.querySelectorAll('a.tree-group-link').forEach((group) => {
    handleChevron(group);
    handleCollapse(group);

    group.addEventListener('click', (e) => {
      handleChevron(e.target);
    });
  });

  function handleChevron(target) {
    const chevron = (target.tagName === "I") ? target : target.querySelector('i');
    const parent = (target.tagName === "I") ? target.closest('a') : target

    if (parent.getAttribute('aria-expanded') === "false") {
      chevron.classList.remove("fa-chevron-down");
      chevron.classList.add("fa-chevron-right");
    } else {
      chevron.classList.remove("fa-chevron-right");
      chevron.classList.add("fa-chevron-down");
    }
  }

  function handleCollapse(target) {
    const group = (target.tagName === "A") ? target : target.parentElement;

    if (group.getAttribute('aria-expanded') === "true") {
      group.parentElement.querySelector(group.getAttribute('href')).classList.add('show');
    } else {
      group.parentElement.querySelector(group.getAttribute('href')).classList.remove('show');
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init_tree(document.querySelector('#menu-tree'));
});