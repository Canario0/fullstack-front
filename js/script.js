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

function setup() {
  $("#formularioPedido")
    .on("submit", (e) => {
      const valid = genericValidator("nombre") & genericValidator("apellidos");
      if (!valid) {
        e.preventDefault();
        return;
      }
    })
    .on("reset", () => {
      genericClear("nombre");
      genericClear("apellidos");
    });
}

$(setup);
