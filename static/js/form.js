const form = document.getElementById("login");

const loginUser = async (event) => {
  event.preventDefault();
  const user = document.getElementById("user").value;
  const passwd = document.getElementById("passwd").value;
  try {
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        passwd,
      }),
    }).then((res) => {
      window.location.replace(res.url);
    });
  } catch (error) {
    alert(error);
    throw error;
  }
};

form.addEventListener("submit", loginUser);
