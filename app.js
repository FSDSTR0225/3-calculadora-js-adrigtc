document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");

  let resetDisplay = false; // Controla cuándo reiniciar el display

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        display.value = "";
        resetDisplay = false;
      } else if (value === "=") {
        try {
          display.value = new Function("return " + display.value)();
          resetDisplay = true; // Activa el reset para el próximo número
        } catch {
          display.value = "Error";
        }
      } else if (value === "√") {
        display.value = Math.sqrt(parseFloat(display.value));
        resetDisplay = true;
      } else if (value === "%") {
        display.value = parseFloat(display.value) / 100;
        resetDisplay = true;
      } else if (value === "x²") {
        display.value = Math.pow(parseFloat(display.value), 2);
        resetDisplay = true;
      } else {
        // Si el usuario presiona un número después de "=" reiniciamos el display
        if (resetDisplay && !isNaN(value)) {
          display.value = value;
        } else {
          display.value += value;
        }

        // Solo reiniciar en la próxima entrada si es un número, no si es un operador
        resetDisplay = value === "=";
      }
    });
  });
});
