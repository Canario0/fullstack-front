function genericValidator(key) {
  if (!key) {
    return false;
  }
  // CAVEAT: this can be archived with the builtin validation from HTML
  if ($(`#${key}`).val()) {
    genericClear(key);
    return true;
  }
  $(`#${key}Label`).css("color", "red");
  return false;
}

function genericClear(key) {
  $(`#${key}Label`).css("color", "");
}

function checkAvailability(size) {
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/checksize",
    data: {
      size,
    },
  })
    .done((r) => {
      const element = $("#size_availability");
      element.text(r);
      element.addClass(
        r === "Disponible"
          ? "availability__available"
          : "availability__out-of-stock"
      );
      element.removeClass(
        r === "Disponible"
          ? "availability__out-of-stock"
          : "availability__available"
      );
    })
    .fail(console.error);
}

function setup() {
  $("#formularioPedido")
    .on("submit", (e) => {
      const valid = genericValidator("nombre") & genericValidator("apellidos");
      if (!valid) {
        e.preventDefault();
        return;
      }
      const availability = $("#size_availability").text();
      console.log(availability);
      if (availability !== "Disponible") {
        e.preventDefault();
        return;
      }
    })
    .on("reset", () => {
      genericClear("nombre");
      genericClear("apellidos");
    });
  const updateAvailability = (value) => {
    if (value) checkAvailability(value);
  };
  $("#tamaño").on("change", (e) => {
    const value = $(e.target).val();
    updateAvailability(value);
  });
  // CAVEAT: initialy there is a selector selected by default.
  const value = $("#tamaño").val();
  updateAvailability(value);
}

$(setup);
