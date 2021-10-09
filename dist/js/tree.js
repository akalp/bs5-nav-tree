function copyAttrs(src, target) {
  for (let attr of src.attributes) {
    if (attr.name == "class")
      attr.value.split(" ").forEach((cls) => target.classList.add(cls))
    else
      target.setAttribute(attr.name, attr.value);
  }
}


var NavTree = function (props) {
  this.props = props;
  this.element = document.querySelector(this.props.obj_id);
  this.searchable = this.element.dataset.hasOwnProperty('searchable');
  this.showEmptyGroups = this.element.dataset.hasOwnProperty('showEmptyGroups');
  this.chevronIcon = `<i class="fas fa-chevron-right"></i>`;
  this.linkIcon = `<i class="fas fa-link"></i>`;
  this.searchInput = `<input type="text" name="menu-tree-search" id="menu-tree-search" class="form-control" placeholder="Search">`;

  this.init = function () {
    if (!this.parent) {
      var parent = document.createElement('div');
      parent.setAttribute('id', 'nav-tree-wrapper');
      this.element.parentElement.replaceChild(parent, this.element);
      parent.appendChild(this.element);
      this.parent = parent;
    }

    this.element.classList.add("nav", "flex-column");

    this.element.querySelectorAll("ul").forEach((ul) => ul.classList.add("nav", "flex-column")); // add bs5 classes to lists

    this.element.querySelectorAll("li").forEach((li) => {
      const li_id = li.getAttribute("id");
      li.classList.add("nav-item"); // add bs5 class to list item

      const a = li.querySelector("a");
      a.classList.add("nav-link");
      a.setAttribute("id", "tree-link-" + li_id);
      var icon_parent = document.createElement('span');
      icon_parent.classList.add("d-inline-block", "tree-icon");
      icon_parent.style.width = '25px';
      a.prepend(icon_parent);

      if (li.querySelector("ul")) { // check list item has a ul object
        a.classList.add("tree-group-link");
        a.setAttribute("data-bs-toggle", "collapse");
        a.setAttribute("role", "button");
        a.setAttribute("aria-expanded", "false");
        a.setAttribute("href", "#nav-tree-list-wrapper-" + li_id);
        a.setAttribute("aria-controls", "nav-tree-list-wrapper-" + li_id);
        icon_parent.innerHTML = this.chevronIcon;


        const ul = li.querySelector("ul");

        var collapsable = document.createElement('div');
        collapsable.classList.add("collapse", "ms-4");
        collapsable.setAttribute("id", "nav-tree-list-wrapper-" + li_id);
        li.replaceChild(collapsable, ul);
        collapsable.appendChild(ul);
        new bootstrap.Collapse(collapsable, { toggle: false });

        collapsable.addEventListener('show.bs.collapse', (e) => {
          e.target.parentElement.querySelector('.tree-icon i').classList.replace('fa-chevron-right', 'fa-chevron-down');
        });

        collapsable.addEventListener('hide.bs.collapse', (e) => {
          e.target.parentElement.querySelector('.tree-icon i').classList.replace('fa-chevron-down', 'fa-chevron-right');
          if (e.target.querySelector('.collapse'))
            bootstrap.Collapse.getInstance(e.target.querySelector('.collapse')).hide();
        });

      } else {

        a.classList.add("tree-link");

        icon_parent.innerHTML = this.linkIcon;

        a.addEventListener('click', () => {
          this.parent.querySelectorAll('a.tree-link').forEach((link) => {
            link.classList.remove('active');
          });

          a.classList.add('active');
        });

      }
      icon_parent.firstElementChild.setAttribute('id', 'tree-icon-' + li_id);
    });

    if (this.searchable) {
      var search_parent = document.createElement('div');
      search_parent.setAttribute('id', 'nav-tree-search-wrapper');
      search_parent.classList.add('my-2');
      this.parent.prepend(search_parent);
      search_parent.innerHTML = this.searchInput;

      search_parent.firstChild.addEventListener('keyup', (e) => {
        const nodes = Array.from(document.querySelectorAll("li"));
        nodes.forEach((i) => i.classList.remove("d-none"));

        if (e.target.value !== '') {
          nodes.filter((i) => !i.querySelector('a').text.toLowerCase().includes(e.target.value)).forEach((i) => i.classList.add("d-none"));
          nodes.filter((node) => node.querySelector('a').classList.contains('tree-group-link')).forEach((node) => {
            if (Array.from(node.querySelectorAll("li")).filter((li) => !li.classList.contains('d-none')).length > 0) {
              const c = node.querySelector('.collapse');
              c.classList.add('no-transition');
              bootstrap.Collapse.getInstance(c).show();
              node.classList.remove('d-none');
              c.classList.remove('no-transition');
            } else if (!this.showEmptyGroups) {
              node.classList.add('d-none');
            }
          });
        }

      });

    }
  }

  this.update = function (menu_html) {
    const old = this.element.cloneNode(true);
    this.parent.innerHTML = menu_html;
    this.element = this.parent.querySelector('ul');
    this.init();
    Array.from(old.querySelectorAll("[id]")).map((i) => i.getAttribute("id")).forEach((id) => {
      var new_node = this.element.querySelector("#" + id);
      var old_node = old.querySelector("#" + id);
      if (new_node && old_node)
        copyAttrs(old_node, new_node);
    });
  }

  this.init();
}