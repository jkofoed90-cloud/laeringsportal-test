(function () {
  var root = document.getElementById("lightbox");
  if (!root) return;

  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var img = root.querySelector(".lightbox-image");
  var caption = root.querySelector(".lightbox-caption");
  var btnPrev = root.querySelector(".lightbox-prev");
  var btnNext = root.querySelector(".lightbox-next");
  var lastFocus = null;
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var item = items[index];
    var full = item.getAttribute("data-full");
    var fallback = item.getAttribute("data-full-fallback") || full;
    var text = item.getAttribute("data-caption") || "";
    var thumb = item.querySelector("img");
    img.alt = thumb ? thumb.getAttribute("alt") || text : text;
    caption.textContent = text;
    img.removeAttribute("src");
    img.src = full;
    img.onerror = function () {
      if (fallback && img.src.indexOf(fallback) === -1) img.src = fallback;
    };
    btnPrev.disabled = items.length < 2;
    btnNext.disabled = items.length < 2;
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    root.hidden = false;
    document.body.classList.add("lightbox-open");
    root.querySelector(".lightbox-close").focus();
  }

  function close() {
    root.hidden = true;
    document.body.classList.remove("lightbox-open");
    img.removeAttribute("src");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () { open(i); });
  });

  root.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-lightbox-close")) close();
  });

  btnPrev.addEventListener("click", function () { show(index - 1); });
  btnNext.addEventListener("click", function () { show(index + 1); });

  document.addEventListener("keydown", function (e) {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
})();
